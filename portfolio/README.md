# Freelance portfolio

A premium, single-page portfolio with a full-bleed layout: black, electric blue and violet, with a full-screen 3D hero scene. It is built with **Next.js**, **React** and **TypeScript**, and pre-rendered to static HTML at build time, so it loads fast and can be hosted anywhere.

## Stack

| Piece | Version | Why |
|-------|---------|-----|
| Next.js (App Router, static export) | 16.4.3 | Pre-renders the page to HTML; no server needed |
| React | 19.2.9 | UI components |
| TypeScript | 6.0.3 | Type safety across content and components |
| Three.js | 0.187.0 | The 3D orb |
| React Three Fiber | 9.8.2 | Three.js as React components |

All versions are pinned exactly.

## Requirements

- Node.js 20.9 or newer

## Commands

Run these inside the `portfolio` folder:

```bash
npm install        # install dependencies (once)
npm run dev        # develop at http://localhost:3000
npm run build      # build the static site into out/
npm run preview    # serve out/ at http://localhost:8000
npm run typecheck  # check TypeScript without building
```

## Make it yours

Almost everything you need to change is in **`content/site.ts`**: name, role, bio, services, projects, process, testimonials, contact details and social links.

Also replace these:

- **`site.url`** in `content/site.ts`: your live domain. It drives SEO tags, the canonical link, the sitemap and structured data.
- **Stats** (`XX+`, `X+`, `XX%`): use only numbers you can back up.
- **Project screenshots**: put images in `public/projects/` and set `image: '/projects/your-image.jpg'` on a project. Without an image, a coloured browser mockup is shown.
- **Colours**: `--accent` (blue) and `--accent-2` (violet) at the top of `app/globals.css`, for both the dark and light themes. The 3D orb reads the same tokens.
- **Contact form**: it opens the visitor's email app by default, with no server needed. To receive messages directly, use a form service such as [Formspree](https://formspree.io): point the form's `action` at your endpoint and remove the handler in `components/ContactForm.tsx`.

## Project structure

```
app/
  layout.tsx        metadata, fonts, structured data, theme setup
  page.tsx          the page, composed from sections
  globals.css       design tokens and all styles
  sitemap.ts        generated /sitemap.xml
  robots.ts         generated /robots.txt
  icon.svg          favicon
  not-found.tsx     404 page
components/
  sections/         Hero, Marquee, Overview (statement + bento), Work, Process, Testimonials, Contact
  HeroCanvas.tsx    hosts the 3D hero scene with a static fallback
  HeroScene.tsx     the 3D scene itself: orb, particle disc, dust (client only, loaded on demand)
  ScrollText.tsx    statement that lights up word by word on scroll
  Wordmark.tsx      giant footer name that scales to the full width
  SpotlightGrid.tsx bento grid whose tiles glow softly around the cursor
  Icon.tsx          service icons
  SplitWords.tsx    word-by-word headline entrance
  MagneticLink.tsx  buttons that lean toward the cursor
  ContactForm.tsx   contact form
  Header.tsx, Footer.tsx, ThemeToggle.tsx, ScrollProgress.tsx, RevealObserver.tsx
content/
  site.ts           all of the site's words and data
lib/
  browser.ts, useAccent.ts
```

## Publish

`npm run build` writes a static site to `out/`. Any static host can serve that folder:

- **Netlify:** set the base directory to `portfolio`, the build command to `npm run build`, and the publish directory to `out`.
- **Vercel:** import the repository and set the root directory to `portfolio`. It detects Next.js automatically.
- **GitHub Pages:** publish the `out` folder through a workflow.

## Performance and accessibility

- **Static HTML:** the page is pre-rendered, so text and layout arrive in the first response. The site also works with JavaScript turned off.
- **Motion:** the hero scene drifts toward the cursor and ripples with fast movement, marquee bands scroll (pause on hover), the statement lights up on scroll and project cards stack. Tiles glow softly around the mouse pointer.
- **Lazy 3D:** the 3D engine loads only after the page is interactive, pauses when off-screen and caps pixel density at 1.75x. If WebGL is unavailable, a gradient orb shows instead.
- **Fonts:** Inter and Inter Tight are self-hosted at build time.
- **Reduced motion:** visitors who prefer less motion get a still orb and no animations.
- **Semantics:** one `h1`, labelled sections, a skip link and visible focus states.

## Before you launch

- [ ] `site.url` is your real domain
- [ ] No placeholder text is left (search `Your Name`, `example.com`, `XX`, `[`)
- [ ] Every link works, including project and social links
- [ ] Checked on a phone and a laptop, in dark and light mode
- [ ] Ran Lighthouse in Chrome DevTools and fixed anything it flagged
