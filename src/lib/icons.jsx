// Miele-style line pictograms (white strokes, no emoji)
const S = ({ size = 24, children, color = "currentColor", sw = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

export const Washer = (p) => <S {...p}><rect x="3.5" y="2.5" width="17" height="19" rx="1.5"/><circle cx="12" cy="13" r="5"/><circle cx="12" cy="13" r="2.2"/><path d="M6 5.5h3"/><circle cx="17" cy="5.5" r=".6" fill="currentColor"/></S>;
export const Dishwasher = (p) => <S {...p}><rect x="3.5" y="2.5" width="17" height="19" rx="1.5"/><path d="M3.5 7h17M7 11h10M7 14.5h10M7 18h10"/></S>;
export const Home = (p) => <S {...p}><path d="M4 10.5 12 4l8 6.5V20h-5v-5H9v5H4z"/></S>;
export const Tag = (p) => <S {...p}><path d="M7 3h10v18H7z"/><path d="M10 8h4M10 11h4M10 14h2"/><circle cx="12" cy="5.2" r=".6" fill="currentColor"/></S>;
export const Camera = (p) => <S {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7 10 4.5h4L15.5 7"/><circle cx="12" cy="13.5" r="3.5"/></S>;
export const Text = (p) => <S {...p}><path d="M5 7h14M5 12h10M5 17h12"/></S>;
export const Chat = (p) => <S {...p}><path d="M4 5h16v11H11l-4 3v-3H4z"/><path d="M8 9h8M8 12h5"/></S>;
export const User = (p) => <S {...p}><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></S>;
export const Users = (p) => <S {...p}><circle cx="9" cy="9" r="3"/><path d="M3.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5"/><circle cx="17" cy="8" r="2.4"/><path d="M16 13.6c2.6.2 4.5 2.4 4.5 5"/></S>;
export const Leaf = (p) => <S {...p}><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19 13 11"/></S>;
export const Clock = (p) => <S {...p}><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/></S>;
export const Back = (p) => <S {...p}><path d="M15 5l-7 7 7 7"/></S>;
export const Plus = (p) => <S {...p}><path d="M12 5v14M5 12h14"/></S>;
export const Send = (p) => <S {...p}><path d="M5 12h13M13 6l6 6-6 6"/></S>;
export const Mic = (p) => <S {...p}><rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3.5"/></S>;
export const Warn = (p) => <S {...p}><path d="M12 4 21 20H3z"/><path d="M12 10v4M12 17v.2"/></S>;
export const Twin = (p) => <S {...p}><rect x="2.5" y="4" width="9" height="15" rx="1"/><rect x="12.5" y="4" width="9" height="15" rx="1" strokeDasharray="2 2"/><circle cx="7" cy="12.5" r="2.5"/><circle cx="17" cy="12.5" r="2.5"/></S>;
export const Check = (p) => <S {...p}><path d="M5 12.5 10 17 19 7"/></S>;
export const Upload = (p) => <S {...p}><path d="M12 16V5M7 10l5-5 5 5M5 19h14"/></S>;
export const Signal = () => <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff"><rect y="7" width="3" height="4" rx=".5"/><rect x="4.5" y="5" width="3" height="6" rx=".5"/><rect x="9" y="2.5" width="3" height="8.5" rx=".5"/><rect x="13.5" width="3" height="11" rx=".5"/></svg>;
export const Battery = () => <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" stroke="#fff" fill="none" opacity=".5"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="#fff"/><rect x="22.5" y="4" width="1.8" height="4" rx=".8" fill="#fff" opacity=".5"/></svg>;
