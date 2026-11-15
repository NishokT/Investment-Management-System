# Freelance portfolio

A fast, static, single-page portfolio with a live 3D hero, built with **Next.js**, **React** and **TypeScript**. The site is pre-rendered to plain HTML at build time, so it loads quickly and can be hosted anywhere.

## Stack

| Piece | Version | Why |
|-------|---------|-----|
| Next.js (App Router, static export) | 16.4.3 | Pre-renders every page to HTML; no server needed |
| React | 19.2.9 | UI components |
| TypeScript | 6.0.3 | Type safety across content and components |
| Three.js | 0.187.0 | The 3D engine |
| React Three Fiber | 9.8.2 | Three.js as React components |

All versions are pinned exactly and were published at least two weeks before the last update.

## Requirements

- Node.js 20.9 or newer

## Commands

```bash
npm install        # install dependencies (once)
npm run dev        # develop at http://localhost:3000
npm run build      # build the static site into out/
npm run preview    # serve out/ at http://localhost:8000
npm run typecheck  # check TypeScript without building
```

## Make it yours

Almost everything you need to change is in **`content/site.ts`**: name, role, bio, services, projects, process, testimonials, contact details and social links. Components only handle layout and motion.

Also replace these:

- **`site.url`** in `content/site.ts`: your live domain. It drives SEO tags, the canonical link, the sitemap and structured data.
- **Stats** (`XX+`, `X+`, `XX%`): use only numbers you can back up.
- **Colours**: change `--accent` (and its dark-mode values) in `app/globals.css`. The 3D scene reads the same token, so it follows your colour.
- **The 3D object**: `components/HeroScene.tsx`. Swap the shape, or change the material values to make it glassier or more matte.
- **Project screenshots**: replace the gradient blocks with `next/image` once you have images. Put them in `public/`.
- **Contact form**: it opens the visitor's email app by default, with no server needed. To receive messages directly, use a free form service such as [Formspree](https://formspree.io): point the form's `action` at your endpoint and remove the handler in `components/ContactForm.tsx`.

## Project structure

```
app/
  layout.tsx        metadata, fonts, structured data, theme setup
  page.tsx          the single page, composed from sections
  globals.css       design tokens and all styles
  sitemap.ts        generated /sitemap.xml
  robots.ts         generated /robots.txt
  icon.svg          favicon
  not-found.tsx     404 page
components/
  sections/         Hero, About, Services, Work, Process, Testimonials, Contact
  HeroScene.tsx     3D scene (client only, loaded on demand)
  HeroVisual.tsx    hosts the 3D scene with a static fallback
  TiltCard.tsx      3D tilt cards with cursor glare
  MagneticLink.tsx  buttons that lean toward the cursor
  SplitWords.tsx    word-by-word heading entrance
  ContactForm.tsx   contact form
  Header.tsx, Footer.tsx, ThemeToggle.tsx, ScrollProgress.tsx, Marquee.tsx
content/
  site.ts           all of the site's words and data
lib/
  browser.ts, useAccent.ts
```

## Publish

`npm run build` writes a static site to `out/`. Any static host can serve that folder:

- **Netlify:** connect the repository, set the build command to `npm run build` and the publish directory to `out`. Or drag the `out` folder onto Netlify Drop.
- **Vercel:** import the project. It detects Next.js automatically.
- **GitHub Pages:** publish the `out` folder through a workflow or a `gh-pages` branch.

## Performance and accessibility

- **Static HTML:** every page is pre-rendered, so text and layout are in the first response, before any JavaScript runs. The site also works with JavaScript turned off.
- **Lazy 3D:** the 3D engine (about 900 KB uncompressed) loads only in the browser, after the page is interactive. Its scene pauses when off-screen and caps pixel density at 2x. If WebGL is unavailable, a gradient panel shows instead.
- **Fonts:** Inter is self-hosted at build time, so there are no third-party font requests at runtime.
- **Reduced motion:** visitors who prefer less motion get a still 3D frame, no tilt or spotlight, and no entrance animations.
- **Semantics:** one `h1`, a logical heading order, a skip link, labelled landmarks and visible focus states.

## Before you launch

- [ ] `site.url` is your real domain
- [ ] No placeholder text is left (search `Your Name`, `example.com`, `XX`, `[`)
- [ ] Every link works, including project and social links
- [ ] Checked on a phone and a laptop, in light and dark mode
- [ ] Ran Lighthouse in Chrome DevTools and fixed anything it flagged
