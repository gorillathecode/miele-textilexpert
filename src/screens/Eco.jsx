const MONTH = [
  { t: "Kaschmir-Pullover", prog: "Wolle 30 °C", score: 8.6, co2: 52 },
  { t: "Seidenbluse", prog: "Seide 20 °C", score: 9.1, co2: 61 },
  { t: "Daunenjacke", prog: "Outdoor 30 °C", score: 8.0, co2: 44 },
];

export default function Eco({ savings }) {
  return (
    <div className="scroll">
      <div className="title" style={{ paddingTop: 30 }}>Eco Dashboard</div>
      <div className="subtitle">Oktober 2026</div>

      <div className="section">Verbrauch</div>
      <div className="stats">
        <div className="stat"><b>612 L</b><small>Wasser</small></div>
        <div className="stat"><b>7,4</b><small>kWh</small></div>
        <div className="stat"><b>14</b><small>Waschgänge</small></div>
      </div>

      <div className="section">Statt Wäscherei gespart · neu</div>
      <div className="accent" style={{ borderColor: "var(--green)" }}>
        <div style={{ fontSize: 34, fontWeight: 600 }}>{savings.euro.toFixed(2).replace(".", ",")} €</div>
        <div className="note" style={{ color: "var(--muted)" }}>{savings.items} Sonderteile selbst gewaschen · ⌀ 9,50 € pro Teil in der Reinigung</div>
      </div>

      <div className="section">Textil-Eco-Score · neu</div>
      {MONTH.map((m) => (
        <div key={m.t} className="row">
          <div className="grow">
            <div className="name" style={{ fontSize: 15 }}>{m.t}</div>
            <div className="sub">{m.prog} · −{m.co2} % CO₂ vs. 60 °C</div>
            <div className="bar" style={{ marginTop: 8 }}><span style={{ width: m.score * 10 + "%", background: "#fff" }} /></div>
          </div>
          <b style={{ color: "var(--green)", fontSize: 18 }}>{m.score}</b>
        </div>
      ))}

      <div className="section">Tipp</div>
      <div className="note">3 deiner letzten 5 Baumwollwäschen liefen mit 60 °C. Mit 40 °C + Fleckenoption sparst du ca. 0,4 kWh pro Gang — bei gleichem Ergebnis.</div>
    </div>
  );
}
