import { useEffect, useRef, useState } from "react";
import { Send, Mic } from "../lib/icons.jsx";
import { chatReply } from "../lib/ai.js";

const QUICK = ["Maschine ist beim Schleudern laut", "Maschine riecht muffig", "Display zeigt F11", "Wie wasche ich Kaschmir?", "Wie voll ist TwinDos?"];

export default function Assistant() {
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hallo! Ich bin dein Miele Assistent. Ich helfe dir bei Programmen, Fehlermeldungen und Pflege — ganz ohne Bedienungsanleitung." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const end = useRef();
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

  const send = async (t = input) => {
    if (!t.trim() || busy) return;
    const next = [...msgs, { from: "me", text: t.trim() }];
    setMsgs(next); setInput(""); setBusy(true);
    const reply = await chatReply(next);
    setMsgs((m) => [...m, { from: "bot", text: reply }]); setBusy(false);
  };

  const voice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setInput("Maschine ist beim Schleudern laut"); return; }
    const r = new SR(); r.lang = "de-DE"; setListening(true);
    r.onresult = (e) => { const t = e.results[0][0].transcript; setListening(false); send(t); };
    r.onend = () => setListening(false); r.start();
  };

  return (
    <>
      <div className="scroll">
        <div className="title" style={{ paddingTop: 30 }}>Miele Assistent</div>
        <div className="subtitle"><span className="dot" style={{ background: "var(--green)", marginRight: 6 }} />Online · auch per Sprache</div>
        <div className="msgs">
          {msgs.map((m, i) => <div key={i} className={"msg " + m.from}>{m.text}</div>)}
          {busy && <div className="msg bot" style={{ color: "var(--muted)" }}>analysiert …</div>}
          <div ref={end} />
        </div>
        {msgs.length < 3 && <div className="chips">{QUICK.map((q) => <button key={q} className="chip" onClick={() => send(q)}>{q}</button>)}</div>}
      </div>
      <div className="composer">
        <button className={"mic" + (listening ? " on" : "")} style={{ width: 40, height: 40, display: "grid", placeItems: "center" }} onClick={voice} aria-label="Sprechen"><Mic /></button>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={listening ? "Ich höre zu …" : "Nachricht schreiben"} />
        <button className="send" disabled={!input.trim() || busy} onClick={() => send()}><Send size={18} color="#fff" /></button>
      </div>
    </>
  );
}
