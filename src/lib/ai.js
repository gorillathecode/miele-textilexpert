import { PRESETS, guessPreset } from "./data.js";

// Ruft /api/analyze bzw. /api/chat auf (Serverless, API-Key bleibt serverseitig).
// Fällt automatisch auf die hinterlegten Demo-Daten zurück.
async function post(path, body) {
  const r = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error("api " + r.status);
  return r.json();
}

export async function analyzeTextile({ mode, text, imageBase64, mediaType, presetKey, weightKg }) {
  const wait = new Promise((res) => setTimeout(res, 2600)); // Ladescreen sichtbar lassen
  let result, live = false;
  if (!presetKey) {
    try { result = await post("/api/analyze", { mode, text, imageBase64, mediaType, weightKg }); live = true; }
    catch { /* Demo-Fallback */ }
  }
  if (!result) result = structuredClone(PRESETS[presetKey || guessPreset(text)].result);
  await wait;
  return { ...result, live };
}

const DIAG = [
  { re: /laut|geräusch|vibr|wackel|schleuder/, a: "Wahrscheinlichste Ursache: Unwucht (ca. 70 %).\n\n① Wäsche gleichmäßig verteilen — ein einzelnes schweres Teil (Bademantel, Jeans) mit weiteren Teilen mischen.\n② Stellfüße prüfen: Maschine darf nicht kippeln.\n③ Fremdkörperfalle auf Münzen/Klammern prüfen.\n\nHat das geholfen?" },
  { re: /riech|müff|stink|geruch/, a: "Geruch entsteht meist durch Biofilm bei vielen 30–40 °C-Wäschen.\n\n① Programm „Maschinenpflege“ mit leerer Trommel starten.\n② Türdichtung und Waschmittelfach trocken wischen, Tür nach dem Waschen offen lassen.\n③ Einmal im Monat mit 60 °C waschen.\n\nSoll ich dich in 4 Wochen daran erinnern?" },
  { re: /fehler|f\d|code|blinkt/, a: "Sag mir kurz, was das Display zeigt (z. B. „F11“). Meist steckt dahinter:\n• F11 → Abpumpen gestört: Laugenpumpe/Fremdkörperfalle reinigen\n• F10 → Wasserzulauf: Hahn offen? Schlauch geknickt?\n\nIn über 80 % der Fälle lässt sich das ohne Techniker lösen." },
  { re: /kaschmir|seide|wolle|programm|wasch ich|temperatur/, a: "Für empfindliche Textilien empfehle ich den Bereich „TextilExpert“ — Etikett oder Kleidungsstück fotografieren, ich wähle dann das passende Miele-Programm, die Temperatur und die Schleuderdrehzahl." },
  { re: /twin|waschmittel|kartusche|dosier/, a: "TwinDos: UltraPhase 1 steht bei 68 %, UltraPhase 2 bei 34 % (reicht ca. 9 Wäschen). Soll ich Nachschub in deinen Warenkorb im Miele Shop legen?" },
];

export async function chatReply(history) {
  try { const r = await post("/api/chat", { history }); if (r?.text) return r.text; } catch {}
  await new Promise((r) => setTimeout(r, 900));
  const last = (history[history.length - 1]?.text || "").toLowerCase();
  const hit = DIAG.find((d) => d.re.test(last));
  return hit ? hit.a : "Ich helfe dir bei Programmen, Fehlermeldungen, Pflege und Wartung. Beschreib einfach, was los ist — z. B. „Maschine macht beim Schleudern Geräusche“.";
}
