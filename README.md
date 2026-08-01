# xitora.cc

<div align="center">
  <img src="./public/assets/profile-art.png" width="112" alt="xitora profile artwork" />
  <h3>A motion-led personal profile.</h3>
  <p>Black, paper white, and electric blue — shaped into a compact cyber-editorial experience.</p>
</div>

---

## Overview

`xitora.cc` is a two-route personal site built around expressive motion and a restrained visual system. The home page unfolds as a scrolling public profile, while the gear archive keeps an expandable list of the equipment currently in use.

### Highlights

- GSAP entrances, scroll reveals, parallax, tilt responses, and painted page transitions
- Lenis-powered smooth scrolling
- Custom cyber scrollbar with draggable progress control
- Desktop-only inverted custom cursor
- Distorted and strongly blurred image backdrops with a noise layer
- Responsive layouts tuned for desktop, tablet, and mobile
- Cloudflare Pages-ready Vite output

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Profile, public details, design signals, and navigation |
| `/gear` | Expandable equipment archive |

## Stack

`React 19` · `TypeScript` · `Vite` · `GSAP` · `Lenis` · `Cloudflare Pages`

## Quick start

```bash
npm install
npm run dev
```

Windows users can also run:

```bat
start.bat
```

Create a production build with:

```bash
npm run build
```

## Editing content

- Public profile records and motion-led sections: `src/App.tsx`
- Equipment entries: `src/data/gear.ts`
- Visual system and responsive behavior: `src/styles.css`
- Site artwork and transition textures: `public/assets`

## Deployment

The production build is emitted to `dist` and deployed to Cloudflare Pages under the `xitora-webmain` project.

---

<div align="center">
  <sub>Designed and built for xitora · 2026</sub>
</div>
