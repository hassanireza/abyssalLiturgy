# Abyssal Liturgy — A Rite of Coffee

A single-page, scroll-driven brewing guide for six coffee methods
(Pour Over, French Press, AeroPress, Moka Pot, Espresso Machine, Cold Brew
Tower), built as a React + TypeScript SPA. Each guide is illustrated with a
frame-by-frame video sequence scrubbed by scroll position — the same
technique Apple uses on its product pages — powered by GSAP 3 and
ScrollTrigger.

## Stack

- React 18 + TypeScript
- Vite 5
- GSAP 3 + ScrollTrigger (scroll-scrubbed canvas frame sequences, reveal
  animations)
- No backend, no auth, no ordering — pure editorial content.

## How the scroll-video works

Each guide's source clip (6s / ~145 frames at 24fps) was pre-extracted into
a JPEG frame sequence (`public/frames/<slug>/f_0001.jpg` …). `FrameSequence`
draws frames onto a `<canvas>` and a pinned `ScrollTrigger` maps scroll
progress within the section directly to a frame index, so the clip plays
exactly once, frame-by-frame, across the full scroll distance of its
section — it can never be scrolled past before it finishes, and it never
auto-advances without scroll input.

The hero picks one of the six full-length source videos at random on every
page load and autoplays it muted/looped as ambient motion.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

This repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds the site and publishes `dist/` to GitHub Pages on every push to
`main`.

One-time setup:

1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Confirm the Vite `base` path in `vite.config.ts` matches your repo name,
   e.g. for `https://username.github.io/brew-guide/` the base should be
   `/brew-guide/`. If you deploy to a root user/org site
   (`username.github.io`), set `base: '/'`.
4. Push to `main` — the workflow builds and deploys automatically.

## Regenerating frame sequences from source video

If you replace a source clip, regenerate its frames with ffmpeg (adjust
scale/quality to taste — the shipped frames are 420px wide JPEGs):

```bash
ffmpeg -i source.mp4 -vf "scale=420:-1" -q:v 4 public/frames/<slug>/f_%04d.jpg
```

Update `frameCount` for that guide in `src/content/guides.ts` if the frame
count changes.

## Project structure

```
src/
  components/
    Hero.tsx            random hero video on load
    Nav.tsx              sticky nav with scrollspy
    FrameSequence.tsx     scroll-scrubbed canvas video
    GuideSection.tsx      per-method content + video
    GrainOverlay.tsx      film-grain texture overlay
  content/
    guides.ts             all copywriting, steps, metadata
  hooks/
    useActiveSection.ts    IntersectionObserver scrollspy
  styles/
    global.css             Abyssal Liturgy design system
public/
  frames/<slug>/           extracted JPEG frame sequences
  videos/<slug>.mp4        full source clips (hero only)
  video-posters/<slug>.jpg  poster frames
```
