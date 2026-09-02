---
name: RunWise AI
description: Dark operate-mode capture UI for running-shoe wear photos. HeroUI v2 on zinc surfaces, primary blue actions, volt accent for ready state.
colors:
  primary: '#006FEE'
  primary-hover: '#005BC4'
  accent: '#CCFF00'
  background-page: '#000000'
  background-light: '#F4F4F5'
  surface-card: '#18181B'
  surface-border: '#27272A'
  card-light: '#FFFFFF'
  text-primary-dark: '#FAFAFA'
  text-primary-light: '#18181B'
  text-muted-dark: '#A1A1AA'
  text-muted-light: '#52525B'
typography:
  display:
    fontFamily: 'Kanit, ui-sans-serif, system-ui, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Kanit, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 'normal'
  title:
    fontFamily: 'Kanit, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.4
rounded:
  lg: '0.75rem'
  xl: '1rem'
  2xl: '1.5rem'
  3xl: '2rem'
spacing:
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '40px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '#FFFFFF'
    rounded: '{rounded.lg}'
    padding: '8px 24px'
  button-primary-disabled:
    backgroundColor: '{colors.surface-border}'
    textColor: '{colors.text-muted-dark}'
    rounded: '{rounded.lg}'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.text-primary-dark}'
    rounded: '{rounded.lg}'
    padding: '8px 16px'
---

## Overview

Incumbent system: a dark, task-first capture product built on HeroUI v2 and Tailwind 4. Default theme is dark (`next-themes`). Headings use Kanit; UI and body use Barlow. Icons are Material Symbols Outlined. Primary blue (`#006FEE`) is for the current step and the one next action. Volt (`#CCFF00`) marks a filled photo slot only. Do not introduce a new palette, display face, or marketing layout.

## Colors

- **Page:** black / zinc-50 depending on theme. Product screens should share one page ground, not a light home and a black upload.
- **Surfaces:** `surface-card` (`#18181B`) with `surface-border` (`#27272A`).
- **Primary:** HeroUI primary blue for CTAs, active stepper, and focus.
- **Accent:** volt lime for "Ready" on a captured view. Not a second brand color on chrome.
- **Muted text:** zinc-600 on light, zinc-400 on dark so body copy clears 4.5:1. Avoid zinc-500 on white.

## Typography

Fixed rem scale, not fluid display. Page titles `text-3xl md:text-4xl` (Kanit, bold). Supporting copy `text-base` with a ~65ch measure. Labels and stepper `text-sm`. Do not use template gradient text or Inter.

## Layout

Content column `max-w-5xl`, horizontal padding `px-4`, vertical `py-8 md:py-12`. Group the title with its lead tightly; separate the drop zone, the three view slots, and the sticky next-step bar. Structural breakpoints: stacked on small, tips beside capture from `lg`.

## Elevation & Depth

Quiet. Cards use a 1px border plus the existing `--shadow-hero` (offset + blur). No glow halos, no nested cards, no glass except the sticky action bar's light backdrop-blur for occlusion.

## Shapes

HeroUI `radius-lg` (12px) on controls and slots. Larger radii (`xl`–`2xl`) only on the capture well. Pills are for the small "Ready" chip, not page sections.

## Components

- **Navbar / footer:** product chrome only. Brand, Start / Photos / Review, theme switch. No leftover Docs/Pricing/Shop/avatar theater.
- **Buttons:** HeroUI `Button`. Primary filled for the next task; light/flat for back, flip, and secondary. Disabled next-step is visible, not just `cursor-not-allowed` opacity.
- **Stepper:** three named steps (Start, Photos, Review). Current step uses a primary ring; completed steps use a check. Respect `prefers-reduced-motion`.
- **Drop zone:** dashed border, two explicit actions (Select files, Use camera). Not a nested button inside a `role="button"`.
- **Camera overlay:** fullscreen portal, dark viewfinder. Distinct states for starting, ready, permission denied, unsupported API, and no webcam. Choose-photo is the recovery path.
- **Photo slots:** 4:3 dashed empty; filled shows the image, view name, ready chip, and remove.

## Do's and Don'ts

- Do keep home, upload, and review on the same shell, type, and tokens.
- Do say "review" for `/analyze` while analysis is a placeholder.
- Don't rebuild `/about`, `/blog`, `/docs`, `/pricing`.
- Don't add a marketing hero, metric row, or fake shoe collection.
- Don't migrate to HeroUI v3 or invent a new visual world.
