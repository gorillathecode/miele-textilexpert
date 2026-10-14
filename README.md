# Miele TextilExpert — App-Prototyp

Prototyp aus der TU Berlin × Miele Innovationswerkstatt. Erweitert die Miele App (Dark Mode, Line-Art-Piktogramme) um KI-Funktionen.
Eine Codebasis für **Web** und **Mobile** (installierbar als PWA, native iOS/Android über Capacitor).

| Screen | Status | Pain Point |
|---|---|---|
| KI-Onboarding | Neu | 10-Schritte-Setup zu komplex, Anleitungen werden nicht gelesen |
| TextilExpert KI (Etikett-Foto, Kleidungs-Foto, Marke) | Neu | Etikett fehlt/unverständlich, besondere Textilien gehen in die Wäscherei |
| Live-Waschstatus mit Phasen-Animation | Neu | Nur Restzeit sichtbar, kein Kontext |
| Digitaler Zwilling / Predictive Maintenance | Neu | Plötzlicher Defekt, lange Ersatzteil-Lieferzeiten |
| Haushalts-Accounts (Admin/Mitglied) | Neu | Kein Fernzugriff für Angehörige, Haushaltshilfe ohne eigenen Zugang |
| KI-Assistent (Text + Sprache) | Erweiterung | Fehlercodes unverständlich, teure Technikeranfahrt |
| Eco Dashboard + Wäscherei-Ersparnis | Erweiterung | Premiumpreis nicht spürbar |

## Starten

```bash
npm install
npm run dev          # http://localhost:5173 — auf dem Handy über die angezeigte Netzwerk-IP
```

Ohne API-Key läuft alles mit fachlich hinterlegten Demo-Analysen (Seide, Kaschmir, Leggings, Daunenjacke, Jeans, Hemd, Leder).

## Echte KI (optional)

Auf Vercel deployen (Repo importieren, Framework: Vite) und die Umgebungsvariable setzen:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Die Funktionen in `/api` rufen Claude serverseitig auf — der Key landet nie im Browser. Fotos werden per Vision analysiert.

## Mobile

- **PWA:** Seite im Handy-Browser öffnen → „Zum Home-Bildschirm“.
- **Native:** `npm run cap:add:ios` bzw. `cap:add:android`, dann `npm run cap:sync` und in Xcode/Android Studio öffnen. Für die KI in der nativen App die API-URL in `src/lib/ai.js` auf die Vercel-Adresse setzen.

## Präsentations-Tipps

- Onboarding erscheint beim ersten Start (zurücksetzen: `localStorage.clear()`).
- Live-Status → „Zeitraffer“ spult den Waschgang im Schnelldurchlauf ab.
- TextilExpert → Ergebnis → „Programm an Maschine senden“ startet den Live-Status und erhöht die Wäscherei-Ersparnis im Eco-Tab.
