import { useState } from "react";
import { Home as HomeI, Tag, Chat, Leaf, Users, Signal, Battery } from "./lib/icons.jsx";
import Home from "./screens/Home.jsx";
import Textil from "./screens/Textil.jsx";
import Assistant from "./screens/Assistant.jsx";
import Eco from "./screens/Eco.jsx";
import Household from "./screens/Household.jsx";
import Twin from "./screens/Twin.jsx";
import Live from "./screens/Live.jsx";
import Onboarding from "./screens/Onboarding.jsx";

const TABS = [
  ["start", "Start", HomeI], ["textil", "TextilKI", Tag], ["assist", "Assistent", Chat], ["eco", "Eco", Leaf], ["haus", "Haushalt", Users],
];

export default function App() {
  const [tab, setTab] = useState("start");
  const [sub, setSub] = useState(null); // "twin" | "live"
  const [onboard, setOnboard] = useState(() => !localStorageSafe("miele_onboarded"));
  const [wash, setWash] = useState({ running: true, program: "Baumwolle 40 °C", textile: null, startedAt: Date.now() - 32 * 60000, minutes: 120 });
  const [savings, setSavings] = useState({ items: 3, euro: 28.5 });

  const startWash = (prog, textile) => {
    setWash({ running: true, program: `${prog.name} ${prog.temp}`, textile, startedAt: Date.now(), minutes: parseMinutes(prog.dauer), rpm: prog.rpm });
    if (textile?.special_care) setSavings((s) => ({ items: s.items + 1, euro: +(s.euro + 9.5).toFixed(2) }));
    setSub("live");
  };

  let view;
  if (sub === "twin") view = <Twin onBack={() => setSub(null)} />;
  else if (sub === "live") view = <Live wash={wash} setWash={setWash} onBack={() => setSub(null)} />;
  else if (tab === "start") view = <Home wash={wash} openTwin={() => setSub("twin")} openLive={() => setSub("live")} openTextil={() => setTab("textil")} />;
  else if (tab === "textil") view = <Textil onStart={startWash} />;
  else if (tab === "assist") view = <Assistant />;
  else if (tab === "eco") view = <Eco savings={savings} />;
  else view = <Household />;

  return (
    <div className="stage">
      <div className="app">
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 28px 0", fontSize: 15, fontWeight: 600 }} className="statusbar">
          <span>9:41</span><span style={{ display: "flex", gap: 6, alignItems: "center" }}><Signal /><Battery /></span>
        </div>
        {view}
        <nav className="nav">
          {TABS.map(([id, label, Icon]) => (
            <button key={id} className={tab === id && !sub ? "on" : ""} onClick={() => { setTab(id); setSub(null); }}>
              <Icon size={23} /><span>{label}</span>
            </button>
          ))}
        </nav>
        {onboard && <Onboarding onDone={() => { try { localStorage.setItem("miele_onboarded", "1"); } catch {} setOnboard(false); }} />}
      </div>
    </div>
  );
}

function localStorageSafe(k) { try { return localStorage.getItem(k); } catch { return null; } }
export function parseMinutes(d = "") {
  const h = d.match(/(\d+):(\d+)/); if (h) return +h[1] * 60 + +h[2];
  const m = d.match(/(\d+)/); return m ? +m[1] : 60;
}
