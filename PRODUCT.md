# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Runners and people who maintain running shoes. They photograph a shoe at a desk, on the floor, or with a phone camera so they can see wear on the side, sole, and top. They are operating a capture tool, not browsing a marketing site.

## Product Purpose

RunWise AI is a shoe-wear analyzer. The shipped job is to collect three required photos (side, sole, top) and take the user to a review step. Success is a complete, honest capture path: home → three photos → Next Step → `/analyze`. Wear-model inference is not in this build.

## Positioning

A session-based capture flow for running-shoe wear photos. Neighboring fitness or shopping apps do not require these three views in this order, and this product does not sell shoes or keep a collection.

## Operating Context

Users work in a browser (desktop or phone). They drag files, pick files, or open a camera overlay (`getUserMedia`) that steps through side, sole, and top. Photos stay in session memory. Camera permission can be denied; some machines have no webcam. Default theme is dark. Stack: Next.js 16 App Router, React 19, HeroUI v2, Tailwind 4, pnpm.

## Capabilities and Constraints

- Required views: side, sole, top. Extra images may sit in an unused `others` bucket.
- `/` starts capture. `/upload` assigns and replaces views. `/analyze` confirms the three photos. Analysis is a placeholder; do not implement ML/AI detection.
- HeroUI v2 is the component library. Do not migrate to HeroUI v3.
- Template leftover routes (`/about`, `/blog`, `/docs`, `/pricing`) exist from the Next.js/HeroUI starter. They are out of product scope unless they leak into navbar/footer.
- Do not add marketing pages. Operate mode, not Persuade. Do not invent testimonials, tread-life scores, mileage, pricing, or replacement recommendations.

## Brand Commitments

Name: **RunWise AI**. Voice: direct, operational, no hype. Controls name the action. Errors name the problem and the recovery (choose a file, retry camera, enable permission). Personality: **precise, quiet, task-first**.

## Evidence on Hand

- Live routes: `src/app/page.tsx`, `src/app/upload/page.tsx`, `src/app/analyze/page.tsx`
- Capture: `src/components/upload/CameraCapture.tsx`, `src/context/UploadContext.tsx`
- Visual tokens: `src/styles/globals.css`, HeroUI v2 via `hero.ts`
- No customer quotes, no real analysis results, no production dataset. Do not fabricate them.

## Product Principles

1. **One product path.** Home, photos, and review share chrome, type, and language.
2. **Three views, then review.** Nothing pretends the model has run.
3. **Camera failures are first-class.** Permission deny and missing webcam have recovery, not a black void.
4. **Preserve the incumbent world.** Dark zinc surfaces, primary blue, volt accent, Kanit headings, Barlow body, Material Symbols.
5. **No hype.** Do not claim instant AI diagnosis this build cannot do.

## Accessibility & Inclusion

Baseline WCAG 2.1 AA on the product path. Visible focus, 4.5:1 body contrast, keyboard access to file pick and camera fallback, `prefers-reduced-motion` on decorative motion, and named controls for capture, remove, and navigation.
