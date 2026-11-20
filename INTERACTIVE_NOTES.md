# Interactive Homepage Upgrade Notes

## Files Added / Changed

### Added
- `src/components/react/HeroDeliveryMap.tsx` — Interactive hero system map (`HOW I DELIVER`) with 4 selectable stages (`Scope`, `Coordinate`, `Implement`, `Measure`), animated inline SVG connecting path, keyboard navigation, and static verified summary line.
- `src/components/react/Reveal.tsx` — Progressive-enhancement section reveal wrapper using Framer Motion (`whileInView`, `once: true`) that keeps content visible in static HTML for no-JS users.
- `src/components/react/ScrollNavEnhancer.tsx` — Top scroll progress bar and `IntersectionObserver`-based active navigation highlighting for desktop and mobile links.
- `src/components/react/InteractiveCaseCard.tsx` — Desktop-only pointer-follow spotlight and subtle hover/focus lift wrapper for case-study cards.
- `src/components/react/MagneticCta.tsx` — Subtle magnetic hover (capped at ±4px X / ±3px Y) for the primary `View Selected Work` CTA on fine-pointer desktop devices.
- `INTERACTIVE_NOTES.md` — Documentation of interactive changes, dependencies, accessibility, and verification.

### Changed
- `astro.config.mjs` — Registered `@astrojs/react` integration alongside `@astrojs/tailwind`.
- `tsconfig.json` — Enabled `jsx: "react-jsx"` and `jsxImportSource: "react"`.
- `package.json` / `pnpm-lock.yaml` — Added React, `@astrojs/react`, `framer-motion`, and React TypeScript definitions.
- `src/styles/global.css` — Added active nav link indicator styles and desktop-only pointer spotlight / lift styles with `prefers-reduced-motion` safeguards.
- `src/layouts/BaseLayout.astro` — Mounted `<ScrollNavEnhancer client:load />` and added `data-nav-section` attributes to desktop and mobile navigation links while preserving existing mobile menu behavior.
- `src/pages/index.astro` — Integrated `HeroDeliveryMap`, `MagneticCta`, `Reveal`, and `InteractiveCaseCard` islands without modifying existing content, routes, case-study labels, or color/typography tokens.

## Dependencies Added
- `@astrojs/react` (`^7.1.9`, installed `7.1.9`)
- `react` (`^19.0.0`, installed `19.3.1`)
- `react-dom` (`^19.0.0`, installed `19.3.1`)
- `framer-motion` (`^12.0.0`, installed `12.43.0`)
- `@types/react` (`^19.0.0`, installed `19.3.0`, devDependency)
- `@types/react-dom` (`^19.0.0`, installed `19.3.0`, devDependency)

## Interaction Behavior
1. **Hero System Map (`HOW I DELIVER`)** (`client:load`):
   - Defaults to `Coordinate` selected.
   - Supports click, hover, keyboard Tab focus, and Arrow/Home/End keys.
   - Updates the stage detail panel and animates the inline SVG connecting rail between nodes.
   - Uses a responsive 2×2 stage grid on narrow mobile viewports (390px) and a 4-column row on `sm+` screens to prevent horizontal overflow.
2. **Section Reveals** (`client:visible` with `rootMargin: "150px"`):
   - Renders fully visible in static HTML (no-JS safe).
   - After hydration, animates once on first view only for sections below the fold, avoiding flash or layout shift.
3. **Scroll Progress + Active Navigation** (`client:load`):
   - Thin 2.5px gradient progress bar fixed to the top of the viewport.
   - `IntersectionObserver` tracks `#about`, `#expertise`, `#case-studies`, `#experience`, and `#contact`, setting `data-active="true"` and `aria-current="location"` on the active nav link.
4. **Interactive Case-Study Cards** (`client:visible` with `rootMargin: "120px"`):
   - Tracks mouse pointer coordinates via CSS custom properties (`--spotlight-x`, `--spotlight-y`) without React re-renders.
   - Subtle `-2px` lift on hover/focus; disabled on touch devices and reduced motion.
5. **Primary CTA Polish** (`client:load`):
   - Subtle spring-damped magnetic offset capped at ±4px X / ±3px Y on desktop mouse hover only; secondary buttons remain visually quieter.

## Accessibility & Reduced-Motion Notes
- Semantic `<button>` elements with `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"` in `HeroDeliveryMap`.
- Full keyboard navigation (`Tab`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, `End`) and visible focus rings (`focus-visible:ring-2`).
- Active nav links expose `aria-current="location"`.
- Both Framer Motion (`useReducedMotion()`) and CSS (`@media (prefers-reduced-motion: reduce)`) disable continuous pulses, spring transitions, reveal motion, magnetic offsets, card lifts, and pointer spotlights; state updates remain instant.
- Progressive enhancement: disabling JavaScript keeps all homepage copy, the default `Coordinate` delivery stage, case studies, and navigation links visible and usable.

## Known Limitations
- Because `Reveal` intentionally renders visible in static HTML to protect no-JS users and prevent flash, sections already inside the viewport on initial load (e.g., when jumping directly to a hash anchor) do not play an entrance fade.
- Pointer spotlight and magnetic CTA hover are intentionally gated to fine-pointer desktop devices (`pointerType === 'mouse'` and `@media (hover: hover) and (pointer: fine)`).
- The existing workspace uses `pnpm` (`node_modules/.pnpm`), so packages were installed via `pnpm install` while `npm run build` executes Astro's static build cleanly.
