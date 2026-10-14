// Vercel Serverless Function — echte Textil-Analyse mit Claude (Text oder Foto).
// Benötigt Umgebungsvariable ANTHROPIC_API_KEY. Ohne Key nutzt die App Demo-Daten.
const SYSTEM = `Du bist Miele-Textilexperte. Empfiehl ausschließlich echte Miele-Waschprogramme
(z. B. Baumwolle, Pflegeleicht, Feinwäsche, Wolle, Seide, Handwäsche, Oberhemden, Jeans,
Outdoor, Imprägnieren, Sportwäsche, Express 20, Dunkle Wäsche) und Miele-Fleckenoptionen.
Wenn ein Etikett fotografiert wurde, lies die Pflegesymbole. Ist das Textil nicht für die
Heimwäsche geeignet (z. B. Leder, Pelz, "nur chemisch reinigen"), setze waesche_geeignet=false.
Antworte NUR mit JSON, ohne Backticks:
{"material":"","farbe":"","typ":"","fleck":null,"special_care":true,"waesche_tipp":null,
"programme":[{"name":"","temp":"30 °C","dauer":"45 min","rpm":"400","wasserL":40,"detMl":25,"energie_kwh":0.3,"begruendung":"","best":true},
{"name":"","temp":"","dauer":"","rpm":"","wasserL":0,"detMl":0,"energie_kwh":0,"begruendung":"","best":false}],
"nachhaltigkeits_score":8.0,"warnungen":[],"tipps":[],"waesche_geeignet":true,"waesche_nicht_geeignet_grund":null}`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "no key" });
  const { mode, text, imageBase64, mediaType, weightKg } = req.body || {};
  const content = [];
  if (imageBase64) content.push({ type: "image", source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageBase64 } });
  content.push({ type: "text", text: `${mode === "label" ? "Foto des Pflegeetiketts." : mode === "photo" ? "Foto des Kleidungsstücks (kein Etikett)." : "Beschreibung: " + (text || "")}${weightKg ? ` Beladung ca. ${weightKg} kg.` : ""}` });
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5", max_tokens: 1200, system: SYSTEM, messages: [{ role: "user", content }] }),
    });
    const d = await r.json();
    const t = (d.content || []).find((c) => c.type === "text")?.text || "";
    const json = JSON.parse(t.replace(/```json|```/g, "").trim());
    return res.status(200).json(json);
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }
}
