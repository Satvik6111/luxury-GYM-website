# Limitless Fitness — Design System (MASTER)

> Source of truth for the built site. If code and this document disagree, the code wins — then update this file.

## Direction

**Editorial Luxury × Cinematic.** A private members' club, not a gym franchise. Dark, warm, restrained. Photography carries the emotion; typography carries the argument; motion carries the pace.

Anti-patterns: light/Swiss layouts, GSAP timelines, purple-blue AI gradients, generic stock-photo brightness, emoji glyphs as icons, 3-column equal grids.

---

## Palette — obsidian + bronze (single accent)

All values live in `src/app/globals.css` `@theme`. **Never hardcode rgba/hex in JSX** — use the token.

### Surfaces
| Token | Value | Use |
|---|---|---|
| `obsidian` | `#0b0c0e` | page background |
| `obsidian-raised` | `#121417` | cards, form shell |
| `obsidian-soft` | `#1a1d21` | hover state |
| `obsidian-deep` | `#0f1114` | inset metric cells |
| `obsidian-veil` | `rgba(11,12,14,.9)` | nav / sticky bar backdrop |
| `obsidian-scrim` | `rgba(11,12,14,.75)` | photo caption bars, badges |

### Text
| Token | Value | Use |
|---|---|---|
| `parchment` | `#f0ebe3` | primary text |
| `parchment-dim` | `#c4bdb2` | secondary text |
| `parchment-faint` | `rgba(196,189,178,.45)` | legal / copyright |
| `parchment-mute` | `rgba(196,189,178,.35)` | input placeholders |

### Accent (bronze — the only hue)
| Token | Value | Use |
|---|---|---|
| `bronze` | `#9a8b72` | `.label`, rules |
| `bronze-bright` | `#c4b49a` | emphasis, focus ring, italic highlights |
| `bronze-line` | `rgba(154,139,114,.5)` | logo box, nav CTA border |
| `bronze-rule` | `rgba(154,139,114,.45)` | 40px section rules, hover borders |
| `bronze-line-soft` | `rgba(154,139,114,.35)` | soft accent borders |
| `bronze-veil` | `rgba(154,139,114,.28)` | promise-bar border |
| `bronze-tint` | `rgba(154,139,114,.12)` | hover fills |
| `bronze-glow` | `rgba(154,139,114,.08)` | ambient radial fills |
| `bronze-halo` | `rgba(196,180,154,.45)` | cursor ring |

### Hairlines (parchment alpha ramp)
`hairline-faint .04` → `hairline-soft .06` → `hairline .08` → `hairline-mid .10` → `hairline-strong .14`

### State
`danger-line` / `danger-bg` — form validation only.

### Elevation
`shadow-card`, `shadow-card-hover` (inner top highlight + deep tinted drop), `shadow-glow`.

---

## Type

- **Display:** Cormorant Garamond → `font-display`. Headings, figures, quotes, form inputs.
- **Body/UI:** Montserrat → `font-sans` (default).
- **Signature move:** *italic + `bronze-bright`* inside a display headline = the emphasis line.
- **Micro-label:** `.label` class — `0.6875rem / 500 / 0.28em / uppercase / bronze`.
- **Fluid scale:** H1 `clamp(2.75rem, 8vw, 6.5rem)`, H2 `clamp(2rem, 4.5vw, 3.75rem)`, H2-alt `clamp(1.85rem, 4vw, 3.25rem)`.
- Metrics use `tabular-nums`. Long prose gets `text-wrap: balance`.

---

## Layout

- Container: `max-w-6xl px-5 md:px-8` (hero `max-w-5xl`).
- Section rhythm: home `py-24 md:py-36`, sub-pages `py-20 md:py-28`, dividers `border-t border-hairline-soft`.
- Card radius: `rounded-panel` (0.5rem); bezels `rounded-bezel`; buttons `rounded-full`.
- **Hairline grid:** `grid gap-px border border-hairline bg-hairline rounded-panel` with `bg-obsidian-raised` children.
- **Double-bezel:** outer shell (`bg-hairline-faint border border-hairline p-1.5 rounded-bezel`) wrapping an inner core with its own bg + `rounded-panel`.
- Layouts must stay asymmetric — no two equal cards side by side unless the content is genuinely parallel.

---

## Motion

- **One easing:** `--ease-luxury` `cubic-bezier(0.22,1,0.36,1)` for reveals; `--ease-snappy` for UI; `--ease-drawer` for panels.
- **Reveal:** fade + rise 28px, 0.95s, `once`, margin `-60px`.
- **LineMask:** `y:110% → 0` inside `overflow-hidden`, 1.1s, staggered 0.1/0.12/0.15.
- **UI states ≤ 300ms** (100–250ms typical), **exits faster than enters**, stagger 30–80ms.
- Only `transform` / `opacity` animate. Press feedback: `active:scale-[0.97]`.
- Hover-only effects gated behind `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` kills transforms; smooth scroll is bypassed.

---

## Imagery

- All photography lives in `public/images/`, delivered through `next/image` via the `<Figure>` primitive.
- Every photo receives the **warm grade**: bronze duotone overlay + obsidian scrim + film grain so any source enters the palette.
- No bright, high-key, or blue-cast stock photos. Subject matter: low-key facility interiors, equipment macro, controlled athletic movement, direct-gaze portrait.
- Icons: **Phosphor Light** only. Never emoji or text glyphs (`✧ ✦ →` are banned).

---

## Accessibility

- Focus: 2px `bronze-bright` outline, 3px offset, `:focus-visible` only.
- Skip link, ARIA on accordion/form/steps, alt text on all meaningful images.
- z-index scale is fixed: nav `50`, overlay `100`, grain `9999`, cursor `10000`.
