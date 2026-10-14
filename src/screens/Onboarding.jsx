import { useEffect, useRef, useState } from "react";
import { Camera, Send } from "../lib/icons.jsx";

// KI-Agent ersetzt den 10-Schritte-Einrichtungsassistenten
const SCRIPT = [
  { bot: "Hallo! Ich richte deine neue Miele mit dir ein — ohne Bedienungsanleitung, in ca. 2 Minuten. Hast du das Typenschild zur Hand? Es ist innen am Türrahmen.", options: ["Ja", "Wo genau?"] },
  { bot: "Scanne einfach den QR-Code auf dem Typenschild.", action: "scan" },
  { bot: "Gefunden: Miele WEB 695 WPS. Soll ich sie mit deinem WLAN „FRITZ!Box 7590“ verbinden?", options: ["Ja, verbinden", "Anderes WLAN"] },
  { bot: "Verbunden. Für die richtige Dosierung brauche ich die Wasserhärte — ich habe sie über deine PLZ ermittelt: 18 °dH (hart). Passt das?", options: ["Passt", "Selbst eingeben"] },
  { bot: "TwinDos ist auf 18 °dH eingestellt. Lebt noch jemand mit dir, der die Maschine bedienen soll? Du kannst Familie oder eine Haushaltshilfe einladen.", options: ["Später", "Jetzt einladen"] },
  { bot: "Fertig! Tipp: Bei Etiketten, die du nicht verstehst, frag einfach TextilExpert.", options: ["Los geht's"], end: true },
];

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState([{ from: "bot", text: SCRIPT[0].bot }]);
  const [scanning, setScanning] = useState(false);
  const end = useRef();
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [log]);

  const answer = (t) => {
    const cur = SCRIPT[step];
    if (cur.end) return onDone();
    const ns = step + 1;
    setLog((l) => [...l, { from: "me", text: t }]);
    setTimeout(() => { setLog((l) => [...l, { from: "bot", text: SCRIPT[ns].bot }]); setStep(ns); }, 600);
  };
  const scan = () => { setScanning(true); setTimeout(() => { setScanning(false); answer("QR-Code gescannt"); }, 1400); };
  const cur = SCRIPT[step];

  return (
    <div className="overlay">
      <div className="topbar" style={{ padding: "calc(env(safe-area-inset-top) + 40px) 20px 0" }}>
        <div className="title" style={{ padding: 0 }}>Einrichtung</div>
      </div>
      <div className="bar" style={{ margin: "14px 20px 0" }}><span style={{ width: ((step + 1) / SCRIPT.length) * 100 + "%", background: "var(--red)" }} /></div>
      <div className="scroll">
        <div className="msgs">
          {log.map((m, i) => <div key={i} className={"msg " + (m.from === "bot" ? "bot" : "me")}>{m.text}</div>)}
          <div ref={end} />
        </div>
        {cur.action === "scan" && (
          <button className="drop" style={{ width: "100%" }} onClick={scan}>
            {scanning ? <div className="spinner" style={{ margin: "0 auto" }} /> : <><Camera size={34} /><div style={{ marginTop: 6 }}>QR-Code scannen</div></>}
          </button>
        )}
        {cur.options && <div className="chips" style={{ justifyContent: "flex-end" }}>
          {cur.options.map((o, i) => <button key={o} className="chip" style={i === 0 ? { background: "var(--red)", borderColor: "var(--red)", color: "#fff" } : {}} onClick={() => answer(o)}>{o}</button>)}
        </div>}
      </div>
      <div style={{ padding: "10px 20px calc(env(safe-area-inset-bottom) + 14px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={{ color: "var(--muted)", fontSize: 13 }} onClick={onDone}>Überspringen</button>
        <span style={{ color: "var(--dim)", fontSize: 12 }}><Send size={12} /> Schritt {step + 1} von {SCRIPT.length}</span>
      </div>
    </div>
  );
}
