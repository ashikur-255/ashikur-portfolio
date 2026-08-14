# Ashikur Rahman — Portfolio

A one-page Angular portfolio: dark mode, violet/magenta gradient accents, and a
"layered stack" hero visual that literally represents a full stack developer's
tech stack (Client → Server → Integration → Data).

## Run it locally

```bash
npm install
npm start
```

Then open http://localhost:4200

## Build for production

```bash
npm run build
```

Output goes to `dist/portfolio`. Deploy that folder to any static host
(Netlify, Vercel, GitHub Pages, Firebase Hosting, etc).

## Where to edit content

Everything — name, bio, skills, experience, education, and projects — lives in
one place: `src/app/app.component.ts`. Edit the arrays/strings at the top of
the class and the page updates automatically.

- `stackLayers` — the 4 layers in the hero visual
- `skillGroups` — skill tags grouped by category
- `experience` — work history timeline
- `education` — education list
- `projects` — project cards (update `link` with real repo URLs once available)

Styling and design tokens (colors, fonts) are in `src/styles.css` under `:root`,
and component-level styles are in `src/app/app.component.css`.

## Stack

- Angular 17 (standalone components, no NgModules)
- Plain CSS (no UI framework) — custom design system
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels/code)
