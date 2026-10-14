// Vercel Serverless Function — Miele Assistent (Diagnose, Programme, Pflege).
const SYSTEM = `Du bist der Miele Assistent in der Miele App. Gerät des Nutzers: Miele WEB 695 WPS
(847 Zyklen, TwinDos: UltraPhase 1 68 %, UltraPhase 2 34 %, Wasserhärte 18 °dH, Laugenpumpe
Prüfung in 4 Tagen fällig). Antworte auf Deutsch, kurz, freundlich, ohne Emojis.
Bei Problemen: wahrscheinlichste Ursache mit grober Wahrscheinlichkeit, dann 2–3 nummerierte
Schritte (①②③), die der Nutzer selbst ausführen kann. Techniker nur empfehlen, wenn nötig.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "no key" });
  const history = (req.body?.history || []).slice(-12);
  const messages = history.filter((m, i) => !(i === 0 && m.from === "bot"))
    .map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text }));
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5", max_tokens: 600, system: SYSTEM, messages }),
    });
    const d = await r.json();
    return res.status(200).json({ text: (d.content || []).find((c) => c.type === "text")?.text || "" });
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }
}
