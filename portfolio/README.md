# 3D freelance portfolio

A single-page portfolio with a live 3D hero scene, tilt cards and scroll-driven reveals. It is plain HTML, CSS and JavaScript, plus a locally vendored copy of Three.js. There is no build step and no package install.

## Files

| File | What it does |
|------|--------------|
| `index.html` | All content: hero, marquee, about, services, projects, process, testimonials, contact |
| `styles.css` | Design. Colours are tokens at the top (`--accent` restyles the whole site) |
| `hero3d.js` | The Three.js hero scene: glossy iridescent knot, wireframe shell, particle field |
| `script.js` | Word-by-word heading, 3D tilt, magnetic buttons, cursor spotlight, dark mode, mobile menu, contact form |
| `vendor/three/` | Three.js r160 (0.160.0) module and `RoomEnvironment.js`, with the MIT licence |
| `favicon.svg` | Browser tab icon. Change the letter to your initials |

## Preview locally

ES modules do not load from `file://`, so run a small local server from this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Check it on a phone too, either with the browser's device mode or by opening your computer's local IP address on the phone.

## Make it yours

Search the files for these placeholders and replace them:

- `Your Name`, `YN`, `CN` (names and initials)
- `hello@example.com` (in `index.html`, and in `data-to` on the form)
- `[City, Country]` and the bracketed bio sentence
- `XX+`, `X+`, `XX%` (hero stats). Use only numbers you can back up.
- Project cards: titles, descriptions and links
- Testimonials: real quotes only, with the client's permission
- Social links: the `#` links in the footer

Other things to adjust:

1. **Colours.** Change `--accent` (plus `--accent-hover` and `--accent-soft`) in `styles.css`. Dark mode has its own values, so update both dark blocks as well. The 3D scene reads `--accent` automatically, so the knot and particles follow your colour.
2. **The 3D object.** In `hero3d.js`, swap `TorusKnotGeometry` for another shape (for example `IcosahedronGeometry` or `TorusGeometry`), or change the material values to make it glassier or more matte.
3. **Project screenshots.** Replace a gradient `project-media` block with a real image:
   ```html
   <img src="images/project-1.jpg" alt="Homepage of the café website redesign" width="1600" height="1000" loading="lazy">
   ```
4. **Services.** Edit, add or remove the three cards. Three or four is plenty.
5. **Contact form.** By default it opens the visitor's email app with the message filled in. That needs no server. To deliver messages straight to you, create a free form on [Formspree](https://formspree.io), set the form's `action` to your endpoint with `method="POST"`, and remove the submit handler in `script.js`.

## Publish for free

Any static host works:

- **Netlify Drop:** drag the `portfolio` folder onto the Netlify Drop page. You get a live link within a minute.
- **GitHub Pages:** put the folder in its own repository, then enable Pages in the repository settings.
- **Vercel:** import the folder as a project. It detects static sites automatically.

Once it is live, you can connect your own domain (for example `yourname.com`) through whichever host you chose.

## Before you send the link to a client

- [ ] No placeholder text is left (search for `Your Name`, `example.com`, `XX`, `[`)
- [ ] Every link works, including project and social links
- [ ] Looks right on a phone and a laptop, in both light and dark mode
- [ ] The 3D hero loads (on some older phones it falls back to the static gradient, which is fine)
- [ ] Run a Lighthouse audit in Chrome DevTools (Performance, Accessibility, SEO) and fix anything flagged

## Accessibility and performance

- Respects `prefers-reduced-motion`: the 3D scene draws one still frame, and animations stop.
- The 3D scene pauses when the hero is off-screen, and it caps pixel density at 2x.
- If WebGL is unavailable, the page shows a gradient panel instead. Nothing breaks.
- The page works without JavaScript, with all content visible.
