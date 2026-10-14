import { useRef, useState } from "react";
import { Tag, Camera, Text, Upload, Warn, Back } from "../lib/icons.jsx";
import { PRESETS } from "../lib/data.js";
import { analyzeTextile } from "../lib/ai.js";

const MODES = [
  { id: "label", Icon: Tag, t: "Etikett fotografieren", s: "Beste Genauigkeit — KI liest die Pflegesymbole" },
  { id: "photo", Icon: Camera, t: "Kleidungsstück fotografieren", s: "Kein Etikett nötig — KI erkennt Material visuell" },
  { id: "text", Icon: Text, t: "Marke oder Beschreibung", s: "Schnellste Option — z. B. „Lululemon Leggings“" },
];
const STEPS = ["Material wird erkannt …", "Pflegeanforderungen werden analysiert …", "Passendes Miele-Programm wird gewählt …", "Ressourcenverbrauch wird optimiert …"];

export default function Textil({ onStart }) {
  const [step, setStep] = useState("mode"); // mode | input | load | result
  const [mode, setMode] = useState(null);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [res, setRes] = useState(null);
  const [sel, setSel] = useState(0);
  const [loadIdx, setLoadIdx] = useState(0);
  const file = useRef();

  const reset = () => { setStep("mode"); setMode(null); setText(""); setImg(null); setRes(null); setSel(0); };

  const pick = (f) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImg({ url: r.result, b64: String(r.result).split(",")[1], type: f.type || "image/jpeg" });
    r.readAsDataURL(f);
  };

  const run = async (presetKey) => {
    setStep("load"); setLoadIdx(0);
    const t = setInterval(() => setLoadIdx((i) => Math.min(i + 1, STEPS.length - 1)), 650);
    const r = await analyzeTextile({ mode, text: presetKey ? PRESETS[presetKey].prompt : text, imageBase64: img?.b64, mediaType: img?.type, presetKey });
    clearInterval(t);
    setRes(r); setSel(Math.max(0, (r.programme || []).findIndex((p) => p.best))); setStep("result");
  };

  if (step === "load") return (
    <div className="scroll" style={{ textAlign: "center" }}>
      <div className="title" style={{ paddingTop: 36 }}>TextilExpert KI</div>
      <div className="spinner" />
      <div style={{ fontSize: 15 }}>{STEPS[loadIdx]}</div>
      <div className="subtitle" style={{ marginTop: 8 }}>Miele analysiert dein Textil</div>
    </div>
  );

  if (step === "result" && res) {
    const p = res.programme?.[sel];
    return (
      <div className="scroll">
        <div className="topbar"><button className="back" onClick={reset}><Back /></button><div className="title">Ergebnis</div><span style={{ width: 36 }} /></div>
        {!res.waesche_geeignet ? (
          <>
            <div className="accent" style={{ marginTop: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Fachreinigung empfohlen</div>
              <div className="note" style={{ marginTop: 8 }}>{res.waesche_nicht_geeignet_grund}</div>
            </div>
            {res.tipps?.map((t) => <div key={t} className="row note">{t}</div>)}
            <button className="btn ghost" style={{ marginTop: 24 }} onClick={reset}>Anderes Textil prüfen</button>
          </>
        ) : (
          <>
            <div className="section">Erkannt {res.live ? "· KI live" : "· Demo"}</div>
            <div className="row"><div className="grow"><div className="name">{res.typ}</div><div className="sub">{res.material} · {res.farbe}</div></div>
              {res.special_care && <span className="pill" style={{ fontSize: 11 }}>Besonderes Textil</span>}</div>
            {res.fleck && <div className="row"><Warn size={20} color="var(--orange)" /><div className="grow"><div className="name warn" style={{ fontSize: 14 }}>Fleck: {res.fleck}</div>{res.waesche_tipp && <div className="note" style={{ marginTop: 4 }}>{res.waesche_tipp}</div>}</div></div>}

            <div className="section">Empfohlenes Programm</div>
            {res.programme.map((pg, i) => (
              <div key={i} className={"prog" + (i === sel ? " on" : "")} onClick={() => setSel(i)}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><b>{pg.name}</b>{pg.best && <span style={{ fontSize: 11, color: "var(--red)", fontWeight: 700 }}>EMPFOHLEN</span>}</div>
                <div className="sub" style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>{pg.temp} · {pg.rpm} U/min · {pg.dauer}</div>
                {i === sel && <div className="note" style={{ marginTop: 6 }}>{pg.begruendung}</div>}
              </div>
            ))}

            {p && <div className="stats" style={{ marginTop: 16 }}>
              <div className="stat"><b>{p.wasserL} L</b><small>Wasser</small></div>
              <div className="stat"><b>{p.detMl} ml</b><small>Waschmittel</small></div>
              <div className="stat"><b>{p.energie_kwh}</b><small>kWh</small></div>
            </div>}

            <div className="section">Nachhaltigkeit</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="bar" style={{ flex: 1 }}><span style={{ width: res.nachhaltigkeits_score * 10 + "%", background: "var(--green)" }} /></div>
              <b style={{ color: "var(--green)" }}>{res.nachhaltigkeits_score.toFixed(1)}</b>
            </div>

            {(res.warnungen?.length > 0 || res.tipps?.length > 0) && <div className="section">Hinweise</div>}
            {res.warnungen?.map((w) => <div key={w} className="note warn" style={{ padding: "4px 0" }}>⚠ {w}</div>)}
            {res.tipps?.map((t) => <div key={t} className="note" style={{ padding: "4px 0" }}>· {t}</div>)}

            <button className="btn red" style={{ marginTop: 24 }} onClick={() => onStart(p, res)}>Programm an Maschine senden</button>
            <button className="btn ghost" style={{ marginTop: 10 }} onClick={reset}>Neues Textil</button>
          </>
        )}
      </div>
    );
  }

  if (step === "input") {
    const M = MODES.find((m) => m.id === mode);
    const ready = mode === "text" ? text.trim().length > 2 : !!img;
    return (
      <div className="scroll">
        <div className="topbar"><button className="back" onClick={() => setStep("mode")}><Back /></button><div className="title">{M.t}</div><span style={{ width: 36 }} /></div>
        {mode === "text" ? (
          <>
            <textarea style={{ marginTop: 20 }} value={text} onChange={(e) => setText(e.target.value)} placeholder="z. B. „Vintage Seidenbluse“ oder „Nike Dri-FIT Shirt“" />
            <div className="chips" style={{ marginTop: 12 }}>
              {["Lululemon Leggings", "Vintage Seidenbluse", "Kaschmir Pullover", "The North Face Daunenjacke", "Lederjacke"].map((c) =>
                <button key={c} className="chip" onClick={() => setText(c)}>{c}</button>)}
            </div>
          </>
        ) : (
          <>
            <div className="drop" style={{ marginTop: 20 }} onClick={() => file.current.click()}>
              <Upload size={30} /><div style={{ marginTop: 8 }}>{mode === "label" ? "Etikett aufnehmen oder hochladen" : "Kleidungsstück aufnehmen oder hochladen"}</div>
            </div>
            <input ref={file} type="file" accept="image/*" capture="environment" hidden onChange={(e) => pick(e.target.files[0])} />
            {img && <img className="preview" src={img.url} alt="Vorschau" />}
          </>
        )}
        <button className="btn red" style={{ marginTop: 20, opacity: ready ? 1 : .4 }} disabled={!ready} onClick={() => run()}>Analysieren</button>

        <div className="section">Oder Demo-Beispiel</div>
        <div className="chips">
          {Object.entries(PRESETS).map(([k, v]) => <button key={k} className="chip" onClick={() => run(k)}>{v.label}</button>)}
        </div>
      </div>
    );
  }

  return (
    <div className="scroll">
      <div className="title" style={{ paddingTop: 36 }}>TextilExpert KI</div>
      <div className="subtitle">Etikett fehlt? Teures Material? Miele weiß, wie es gewaschen wird.</div>
      <div style={{ marginTop: 18 }}>
        {MODES.map(({ id, Icon, t, s }) => (
          <div key={id} className={"mode" + (mode === id ? " on" : "")} onClick={() => { setMode(id); setStep("input"); }}>
            <Icon size={30} sw={1.3} /><div className="grow"><div className="name">{t}</div><div className="sub">{s}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}
