import { useEffect, useState } from "react";
import { Back } from "../lib/icons.jsx";
import { remaining, fmt } from "./Home.jsx";

const PHASES = ["Einweichen", "Hauptwäsche", "Spülen", "Schleudern"];

export default function Live({ wash, setWash, onBack }) {
  const [, tick] = useState(0);
  const [demo, setDemo] = useState(false);
  useEffect(() => { const t = setInterval(() => tick((x) => x + 1), demo ? 80 : 1000); return () => clearInterval(t); }, [demo]);

  // Demo-Modus: Zeit 60x schneller für die Präsentation
  useEffect(() => {
    if (!demo) return;
    const t = setInterval(() => setWash((w) => ({ ...w, startedAt: w.startedAt - 60000 })), 80);
    return () => clearInterval(t);
  }, [demo, setWash]);

  const left = remaining(wash);
  const pct = wash.running ? Math.min(100, Math.round(100 - (left / (wash.minutes * 60000)) * 100)) : 0;
  const phase = Math.min(3, Math.floor(pct / 25));
  const done = wash.running && left <= 0;
  const water = phase === 3 ? 10 : phase === 0 ? 30 : 55;

  return (
    <div className="scroll">
      <div className="topbar"><button className="back" onClick={onBack}><Back /></button><div className="title">{done ? "Fertig" : wash.running ? "Waschgang läuft" : "Bereit"}</div><span style={{ width: 36 }} /></div>
      <div className="subtitle">{wash.program}{wash.textile ? ` · ${wash.textile.typ} (TextilExpert)` : ""}</div>

      <div className={"drum" + (wash.running && !done ? " spin" : "")}>
        <div className="water" style={{ height: done ? 0 : water + "%" }} />
        <div className="laundry" />
        <div className="pct"><b>{done ? "✓" : pct + "%"}</b><small style={{ color: "#aaa" }}>{done ? "Wäsche entnehmen" : PHASES[phase]}</small></div>
      </div>

      <div className="phases">
        {PHASES.map((p, i) => <div key={p} className={done || i < phase ? "done" : i === phase ? "now" : ""}><i />{p}</div>)}
      </div>

      <div className="stats" style={{ marginTop: 16 }}>
        <div className="stat"><b>{wash.program.match(/\d+ °C/)?.[0] || "40 °C"}</b><small>Temperatur</small></div>
        <div className="stat"><b>{fmt(left)}</b><small>Restzeit</small></div>
        <div className="stat"><b>{wash.rpm || 1400}</b><small>U/min</small></div>
      </div>

      {wash.textile && <div className="accent" style={{ marginTop: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--red)" }}>TEXTILEXPERT</div>
        <div className="note" style={{ marginTop: 4 }}>{wash.textile.material}</div>
        {wash.textile.warnungen?.map((w) => <div key={w} className="note warn">⚠ {w}</div>)}
      </div>}

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        {wash.running && !done
          ? <button className="btn ghost" onClick={() => setWash((w) => ({ ...w, running: false }))}>Stopp</button>
          : <button className="btn red" onClick={() => setWash((w) => ({ ...w, running: true, startedAt: Date.now() }))}>Start</button>}
        <button className="btn ghost" onClick={() => setDemo((d) => !d)}>{demo ? "Normal" : "Zeitraffer"}</button>
      </div>
    </div>
  );
}
