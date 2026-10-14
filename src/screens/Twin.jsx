import { useState } from "react";
import { Back, Warn, Washer, Check } from "../lib/icons.jsx";

const PARTS = [
  { name: "Laugenpumpe", life: 12, eta: "Prüfung in 4 Tagen", warn: true },
  { name: "Türdichtung", life: 64, eta: "ca. 18 Monate" },
  { name: "Kohlebürsten Motor", life: 81, eta: "ca. 4 Jahre" },
  { name: "Heizstab (Verkalkung)", life: 73, eta: "Entkalkt vor 9 Tagen" },
];

export default function Twin({ onBack }) {
  const [ordered, setOrdered] = useState({});
  return (
    <div className="scroll">
      <div className="topbar"><button className="back" onClick={onBack}><Back /></button><div className="title">Digitaler Zwilling</div><span style={{ width: 36 }} /></div>
      <div className="row">
        <Washer size={46} sw={1.3} />
        <div className="grow"><div className="name">WEB 695 WPS</div><div className="sub">Gekauft 12.01.2025 · 847 Zyklen</div></div>
      </div>
      <div className="row"><span className="dot" style={{ background: "var(--green)" }} /><div className="grow" style={{ fontSize: 14 }}>Trommelbalance stabil · 1.400 U/min · Wasserhärte 18 °dH (Berlin)</div></div>

      <div className="section">TwinDos</div>
      {[["UltraPhase 1", 68, "#fff"], ["UltraPhase 2", 34, "var(--orange)"]].map(([n, v, c]) => (
        <div key={n} style={{ padding: "8px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}><span>{n}</span><b style={{ color: c }}>{v} %</b></div>
          <div className="bar"><span style={{ width: v + "%", background: c }} /></div>
        </div>
      ))}

      <div className="section">Wartungsprognose</div>
      {PARTS.map((p) => (
        <div key={p.name} className="row">
          {p.warn ? <Warn size={22} color="var(--orange)" /> : <span style={{ width: 22 }} />}
          <div className="grow">
            <div className="name" style={{ fontSize: 15, color: p.warn ? "var(--orange)" : "#fff" }}>{p.name}</div>
            <div className="sub">{p.eta} · Restlebensdauer {p.life} %</div>
          </div>
          {(p.warn || p.life < 70) && (ordered[p.name]
            ? <span className="pill" style={{ fontSize: 12 }}><Check size={14} />bestellt</span>
            : <button className="btn ghost small" onClick={() => setOrdered((o) => ({ ...o, [p.name]: true }))}>{p.warn ? "Termin" : "Vorbestellen"}</button>)}
        </div>
      ))}
      <div className="note" style={{ marginTop: 16, color: "var(--muted)" }}>Die Prognose basiert auf Zyklen, Temperaturen, Schleuderlast und Wasserhärte deines Geräts. Ersatzteile werden bestellt, bevor sie ausfallen — keine Woche ohne Waschmaschine.</div>
    </div>
  );
}
