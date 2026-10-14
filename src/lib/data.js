// Fachlich hinterlegte Demo-Analysen — greifen, wenn kein API-Key gesetzt ist
// oder die KI nicht erreichbar ist. So läuft die Demo immer.
export const PRESETS = {
  seide: {
    label: "Seidenbluse",
    prompt: "Vintage Seidenbluse, 100% Seide, creme, Etikett: Handwäsche 30°C, nicht schleudern, nicht im Trockner",
    result: {
      material: "100% Seide", farbe: "Creme", typ: "Bluse", fleck: null, special_care: true,
      waesche_tipp: null,
      programme: [
        { name: "Seide", temp: "20 °C", dauer: "40 min", rpm: "400", wasserL: 38, detMl: 20, energie_kwh: 0.15, begruendung: "Miele Seide-Programm: sehr geringe Trommelbewegung, schützt Fasern und Glanz.", best: true },
        { name: "Handwäsche", temp: "30 °C", dauer: "45 min", rpm: "400", wasserL: 40, detMl: 20, energie_kwh: 0.2, begruendung: "Alternative laut Etikett; minimal intensiver.", best: false },
      ],
      nachhaltigkeits_score: 9.1, warnungen: ["Nicht im Trockner trocknen", "Feinwaschmittel verwenden (z. B. UltraPhase-frei, Caps SilkCare)"],
      tipps: ["Auf links drehen und im Wäschenetz waschen", "Liegend auf einem Handtuch trocknen"],
      waesche_geeignet: true, waesche_nicht_geeignet_grund: null,
    },
  },
  wolle: {
    label: "Kaschmir-Pullover",
    prompt: "Kaschmir Pullover beige, Etikett: 100% Kaschmir, Wolle 30°C",
    result: {
      material: "100% Kaschmir", farbe: "Beige", typ: "Pullover", fleck: null, special_care: true, waesche_tipp: null,
      programme: [
        { name: "Wolle", temp: "30 °C", dauer: "39 min", rpm: "600", wasserL: 40, detMl: 20, energie_kwh: 0.2, begruendung: "Miele Schontrommel + Wollprogramm (Woolmark-zertifiziert) verhindert Verfilzen und Pilling.", best: true },
        { name: "Handwäsche", temp: "20 °C", dauer: "45 min", rpm: "400", wasserL: 40, detMl: 20, energie_kwh: 0.12, begruendung: "Noch schonender, falls der Pullover sehr fein ist.", best: false },
      ],
      nachhaltigkeits_score: 8.6, warnungen: ["Nicht über 600 U/min schleudern", "Kein Weichspüler"],
      tipps: ["Wollwaschmittel verwenden", "Liegend in Form ziehen und trocknen"],
      waesche_geeignet: true, waesche_nicht_geeignet_grund: null,
    },
  },
  sport: {
    label: "Lululemon Leggings",
    prompt: "Lululemon Align Leggings",
    result: {
      material: "81% Nylon, 19% Lycra (Nulu™)", farbe: "Schwarz", typ: "Leggings", fleck: "Schweiß/Geruch", special_care: true,
      waesche_tipp: "Direkt nach dem Training auf links drehen, nicht feucht liegen lassen.",
      programme: [
        { name: "Sportwäsche", temp: "30 °C", dauer: "59 min", rpm: "1200", wasserL: 45, detMl: 30, energie_kwh: 0.3, begruendung: "Entfernt Gerüche aus Funktionsfasern, ohne Elastan zu schädigen.", best: true },
        { name: "Feinwäsche", temp: "30 °C", dauer: "50 min", rpm: "600", wasserL: 46, detMl: 25, energie_kwh: 0.3, begruendung: "Schonender, wenn kaum verschmutzt.", best: false },
      ],
      nachhaltigkeits_score: 8.4, warnungen: ["Kein Weichspüler — verschließt die Faser", "Nicht im Trockner"],
      tipps: ["Mit ähnlich glatten Stoffen waschen (keine Handtücher → Fusseln)", "Lufttrocknen"],
      waesche_geeignet: true, waesche_nicht_geeignet_grund: null,
    },
  },
  daune: {
    label: "Daunenjacke",
    prompt: "The North Face Daunenjacke 700 Fill, Außenstoff Nylon",
    result: {
      material: "Nylon-Außenstoff, Daunenfüllung 700 Fill", farbe: "Schwarz", typ: "Daunenjacke", fleck: null, special_care: true, waesche_tipp: "Reißverschlüsse und Druckknöpfe schließen.",
      programme: [
        { name: "Outdoor", temp: "30 °C", dauer: "54 min", rpm: "800", wasserL: 52, detMl: 30, energie_kwh: 0.3, begruendung: "Schonende Wäsche für Membran und Daune, mehrfaches Spülen gegen Rückstände.", best: true },
        { name: "Imprägnieren", temp: "40 °C", dauer: "40 min", rpm: "800", wasserL: 30, detMl: 0, energie_kwh: 0.4, begruendung: "Danach separat, stellt den Wasserschutz wieder her.", best: false },
      ],
      nachhaltigkeits_score: 8.0, warnungen: ["Daunenwaschmittel verwenden"],
      tipps: ["Im Trockner mit 2–3 Tennisbällen auf niedriger Stufe aufschütteln"],
      waesche_geeignet: true, waesche_nicht_geeignet_grund: null,
    },
  },
  jeans: {
    label: "Jeans · Grasfleck",
    prompt: "Blaue Jeans mit Grasfleck am Knie",
    result: {
      material: "98% Baumwolle, 2% Elasthan", farbe: "Indigo", typ: "Jeans", fleck: "Gras", special_care: false,
      waesche_tipp: "Grasfleck mit Gallseife oder enzymhaltigem Fleckenmittel 15 min einwirken lassen — nicht heiß vorwaschen.",
      programme: [
        { name: "Jeans + Fleckenoption Gras", temp: "30 °C", dauer: "1:15 h", rpm: "900", wasserL: 48, detMl: 35, energie_kwh: 0.35, begruendung: "Miele Fleckenoption passt Temperatur und Zeit an das Enzym-Optimum an.", best: true },
        { name: "Baumwolle", temp: "40 °C", dauer: "1:59 h", rpm: "1200", wasserL: 55, detMl: 40, energie_kwh: 0.6, begruendung: "Kräftiger, aber stärkeres Ausbleichen.", best: false },
      ],
      nachhaltigkeits_score: 8.2, warnungen: ["Auf links drehen gegen Ausbleichen"], tipps: ["Mit dunklen Farben waschen"],
      waesche_geeignet: true, waesche_nicht_geeignet_grund: null,
    },
  },
  hemd: {
    label: "Weißes Hemd · Rotwein",
    prompt: "Weißes Baumwollhemd mit Rotweinfleck",
    result: {
      material: "100% Baumwolle", farbe: "Weiß", typ: "Hemd", fleck: "Rotwein", special_care: false,
      waesche_tipp: "Sofort mit kaltem Wasser ausspülen, nicht reiben. Kein heißes Wasser — fixiert den Farbstoff.",
      programme: [
        { name: "Oberhemden + Fleckenoption Rotwein", temp: "40 °C", dauer: "1:05 h", rpm: "600", wasserL: 45, detMl: 30, energie_kwh: 0.5, begruendung: "Fleckenoption setzt Bleichaktivierung gezielt ein; 600 U/min für weniger Knitter.", best: true },
        { name: "Baumwolle", temp: "60 °C", dauer: "2:39 h", rpm: "1400", wasserL: 60, detMl: 40, energie_kwh: 1.0, begruendung: "Nur falls der Fleck älter ist.", best: false },
      ],
      nachhaltigkeits_score: 7.6, warnungen: [], tipps: ["Mit Vollwaschmittel (Bleiche) für Weißes waschen"],
      waesche_geeignet: true, waesche_nicht_geeignet_grund: null,
    },
  },
  leder: {
    label: "Lederjacke",
    prompt: "Echte Lederjacke",
    result: {
      material: "Glattleder", farbe: "Braun", typ: "Jacke", fleck: null, special_care: true, waesche_tipp: null, programme: [],
      nachhaltigkeits_score: 0, warnungen: [], tipps: ["Lederpflege mit feuchtem Tuch + Lederbalsam"],
      waesche_geeignet: false, waesche_nicht_geeignet_grund: "Echtes Leder darf nicht in die Waschmaschine — es wird hart und rissig. Hier ist eine Fachreinigung die richtige Wahl.",
    },
  },
};

// Grobe Zuordnung freier Eingaben auf eine Demo-Analyse
export function guessPreset(text = "") {
  const t = text.toLowerCase();
  if (/leder/.test(t)) return "leder";
  if (/seide|silk/.test(t)) return "seide";
  if (/kaschmir|cashmere|wolle|wool|merino/.test(t)) return "wolle";
  if (/daune|north face|down|puffer/.test(t)) return "daune";
  if (/legging|lululemon|sport|nike|dri|gym/.test(t)) return "sport";
  if (/jeans|denim|gras/.test(t)) return "jeans";
  return "hemd";
}

export const MEMBERS_INIT = [
  { id: 1, name: "Gertrude (Oma)", init: "G", role: "ADMIN", note: "Geräteinhaberin", rights: { start: true, settings: true, members: true }, window: "Immer" },
  { id: 2, name: "Arian (Enkel)", init: "A", role: "MITGLIED", note: "Fernzugriff", rights: { start: true, settings: false, members: false }, window: "Immer" },
  { id: 3, name: "Maria (Haushaltshilfe)", init: "M", role: "MITGLIED", note: "Bedienung", rights: { start: true, settings: false, members: false }, window: "Di–Fr, 8–14 Uhr" },
];
