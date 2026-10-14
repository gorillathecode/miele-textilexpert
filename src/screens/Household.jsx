import { useState } from "react";
import { Washer, Back, Plus } from "../lib/icons.jsx";
import { MEMBERS_INIT } from "../lib/data.js";

const HOUSES = [
  { id: "oma", name: "Omas Wohnung", device: "WEB 695 WPS", myRole: "MITGLIED", status: "Läuft", members: MEMBERS_INIT },
  { id: "me", name: "Meine Wohnung", device: "WCA 030 WCS", myRole: "ADMIN", status: "Bereit", members: [
    { id: 4, name: "Arian (ich)", init: "A", role: "ADMIN", note: "Geräteinhaber", rights: { start: true, settings: true, members: true }, window: "Immer" },
    { id: 5, name: "Maria (Haushaltshilfe)", init: "M", role: "MITGLIED", note: "Bedienung", rights: { start: true, settings: false, members: false }, window: "Mi, 9–13 Uhr" },
  ] },
];
const RIGHTS = [["start", "Waschgang starten & stoppen"], ["settings", "Geräteeinstellungen ändern"], ["members", "Mitglieder verwalten"]];

export default function Household() {
  const [houses, setHouses] = useState(HOUSES);
  const [open, setOpen] = useState(null);
  const [member, setMember] = useState(null);
  const [toast, setToast] = useState("");

  const flash = (t) => { setToast(t); setTimeout(() => setToast(""), 2200); };
  const H = houses.find((h) => h.id === open);
  const isAdmin = H?.myRole === "ADMIN";

  const update = (mid, fn) => setHouses((hs) => hs.map((h) => h.id !== open ? h : { ...h, members: h.members.map((m) => m.id === mid ? fn(m) : m) }));

  if (H && member) {
    const m = H.members.find((x) => x.id === member);
    return (
      <div className="scroll">
        <div className="topbar"><button className="back" onClick={() => setMember(null)}><Back /></button><div className="title">{m.name}</div><span style={{ width: 36 }} /></div>
        <div className="section">Rolle</div>
        <div className="chips">
          {["ADMIN", "MITGLIED"].map((r) => <button key={r} className="chip" disabled={!isAdmin} style={{ borderColor: m.role === r ? "#fff" : "#444", color: m.role === r ? "#fff" : "#888" }}
            onClick={() => update(m.id, (x) => ({ ...x, role: r, rights: r === "ADMIN" ? { start: true, settings: true, members: true } : x.rights }))}>{r}</button>)}
        </div>
        <div className="section">Rechte</div>
        {RIGHTS.map(([k, label]) => (
          <div key={k} className="row">
            <div className="grow" style={{ fontSize: 15 }}>{label}</div>
            <button className={"toggle" + (m.rights[k] ? " on" : "")} disabled={!isAdmin || m.role === "ADMIN"} onClick={() => update(m.id, (x) => ({ ...x, rights: { ...x.rights, [k]: !x.rights[k] } }))} />
          </div>
        ))}
        <div className="section">Zugriffszeiten</div>
        <div className="row"><div className="grow" style={{ fontSize: 15 }}>{m.window}</div></div>
        {!isAdmin && <div className="note" style={{ marginTop: 16, color: "var(--muted)" }}>Nur Admins dieses Haushalts können Rechte ändern.</div>}
      </div>
    );
  }

  if (H) return (
    <div className="scroll">
      <div className="topbar"><button className="back" onClick={() => setOpen(null)}><Back /></button><div className="title">{H.name}</div><span style={{ width: 36 }} /></div>
      <div className="row">
        <Washer size={44} sw={1.3} />
        <div className="grow"><div className="name">{H.device}</div><div className="sub"><span className="dot" style={{ background: H.status === "Läuft" ? "#2BC0A4" : "#666" }} />{H.status} · Deine Rolle: {H.myRole}</div></div>
      </div>
      {H.id === "oma" && <button className="btn ghost" style={{ marginTop: 16 }} onClick={() => flash("Waschgang „Pflegeleicht 40 °C“ bei Oma ferngestartet")}>Waschgang aus der Ferne starten</button>}
      <div className="section">Mitglieder</div>
      {H.members.map((m) => (
        <div key={m.id} className="row tap" onClick={() => setMember(m.id)}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#2a2a2a", display: "grid", placeItems: "center", fontWeight: 600 }}>{m.init}</div>
          <div className="grow"><div className="name" style={{ fontSize: 15 }}>{m.name}</div><div className="sub">{m.note} · {m.window}</div></div>
          <span className={"badge " + (m.role === "ADMIN" ? "admin" : "member")}>{m.role}</span>
        </div>
      ))}
      {isAdmin && <button className="btn ghost" style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 8 }} onClick={() => flash("Einladungslink kopiert")}><Plus size={20} />Person einladen</button>}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );

  return (
    <div className="scroll">
      <div className="title" style={{ paddingTop: 30 }}>Haushalte</div>
      <div className="subtitle">Mehrere Wohnungen · Rollen · Fernzugriff</div>
      {houses.map((h) => (
        <div key={h.id} className="row tap" onClick={() => setOpen(h.id)}>
          <Washer size={44} sw={1.3} />
          <div className="grow"><div className="name">{h.name}</div><div className="sub">{h.device} · {h.members.length} Personen</div></div>
          <span className={"badge " + (h.myRole === "ADMIN" ? "admin" : "member")}>{h.myRole}</span>
        </div>
      ))}
      <div className="section">Rollen</div>
      <div className="note"><b>Admin</b> — volle Kontrolle: Einstellungen, Programme sperren, Mitglieder verwalten.</div>
      <div className="note" style={{ marginTop: 8 }}><b>Mitglied</b> — definierte Rechte und Zeitfenster, z. B. Haushaltshilfe nur Di–Fr.</div>
    </div>
  );
}
