import { useEffect, useState } from "react";
import { Washer, Dishwasher, Clock, Plus, Twin, Tag } from "../lib/icons.jsx";

export function remaining(wash) {
  const left = wash.minutes * 60000 - (Date.now() - wash.startedAt);
  return Math.max(0, left);
}
export const fmt = (ms) => { const m = Math.ceil(ms / 60000); return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; };

export default function Home({ wash, openTwin, openLive, openTextil }) {
  const [, tick] = useState(0);
  useEffect(() => { const t = setInterval(() => tick((x) => x + 1), 1000); return () => clearInterval(t); }, []);
  const left = remaining(wash);
  const running = wash.running && left > 0;

  return (
    <div className="scroll">
      <div className="title" style={{ paddingTop: 40 }}>Willkommen bei Miele</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "12px 0 4px" }}><Plus size={26} /></div>

      <div className="row tap" onClick={openLive}>
        <Washer size={48} sw={1.3} />
        <div className="grow">
          <div className="name">Waschmaschine</div>
          <div className="sub"><span className="dot" style={{ background: running ? "#2BC0A4" : "#666" }} />{running ? "Läuft" : "Bereit"}</div>
          {running && <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <span className="pill"><Clock size={16} /><b>{fmt(left)}</b></span><span style={{ color: "var(--muted)", fontSize: 13 }}>Ende</span>
          </div>}
        </div>
        <button className="more" onClick={(e) => { e.stopPropagation(); openTwin(); }} aria-label="Digitaler Zwilling"><span><i /><i /><i /></span></button>
      </div>

      <div className="row">
        <Dishwasher size={48} sw={1.3} />
        <div className="grow"><div className="name">Geschirrspüler</div><div className="sub"><span className="dot" style={{ background: "#666" }} />Aus</div></div>
        <div className="more"><span><i /><i /><i /></span></div>
      </div>

      <div className="row tap" onClick={openTwin}>
        <Twin size={30} />
        <div className="grow"><div className="name" style={{ fontSize: 15 }}>Digitaler Zwilling</div><div className="sub"><span className="dot" style={{ background: "var(--orange)" }} />Laugenpumpe: Prüfung in 4 Tagen</div></div>
      </div>

      <div className="hero" onClick={openTextil} style={{ cursor: "pointer" }}>
        <div style={{ position: "absolute", right: 16, top: 16, opacity: .25 }}><Tag size={90} sw={1} /></div>
        <div><small>Neu · Kein Grund mehr zur Wäscherei</small><h3>TextilExpert KI</h3></div>
      </div>
      <div className="hero" style={{ background: "linear-gradient(135deg,#3a3530,#1d1b19)" }}>
        <div><small>Werden Sie zum Experten</small><h3>Smart Features</h3></div>
      </div>
    </div>
  );
}
