# Task: Upgrade the existing portfolio homepage to feel more interactive and premium

## Context
Project root: `C:\Users\Xineko\AI Related (Hermes)\Portfolio\galih-giri`
Existing site: Astro 7 + TypeScript + Tailwind, static output, 7 pages.
Current homepage: `src/pages/index.astro`; layout: `src/layouts/BaseLayout.astro`; content: `src/data/content.ts`; styles: `src/styles/global.css`.

This is an EXTENSION task. Do NOT rebuild the site. Do NOT replace the existing content, page structure, case-study routes, color system, or typography. Audit the current files first, then add a focused interactive layer to the homepage.

## User goal
Make the homepage/landing page feel more interactive and modern. React islands are acceptable. Three.js is NOT required and should not be added unless there is a clear, lightweight need. Prefer React + Motion/Framer Motion and native CSS/Canvas over a heavy 3D scene.

## Required stack changes
1. Add the official Astro React integration and dependencies:
   - `npx astro add react --yes`
   - `npm install framer-motion`
   - Verify the installed versions are compatible with the existing Astro version.
2. Add React components under `src/components/react/`.
3. Hydrate only small islands. Do not turn the whole page into a client-rendered React app.
4. The homepage must still be useful with JavaScript disabled: static HTML content remains visible; React enhances it only.

## Interaction design (build these, in order)
1. **Interactive hero system map** — the signature interaction.
   - Replace/augment the current right-side `Profile Snapshot` card with a compact interactive panel titled `HOW I DELIVER`.
   - Four selectable stages, verified wording only:
     - `Scope` — clarify objectives, scope, and constraints.
     - `Coordinate` — align stakeholders across departments.
     - `Implement` — support rollout and adoption.
     - `Measure` — monitor progress and evaluate results.
   - Clicking, hovering, or keyboard focusing a stage updates a short detail panel and animates a connecting path between nodes.
   - Default state: `Coordinate` selected.
   - Include a small static summary line: `6 years • Multiple departments • VR & digital training • AI evaluation`.
   - Do not invent metrics, project counts, budgets, team sizes, or department names.
   - Keep the existing visual language (navy, teal, slate, white, thin borders, rounded cards).
   - Must work at 390px width without overflow; on mobile, stages can become a horizontal scroll row or stacked list.
   - Respect `prefers-reduced-motion`: disable continuous animation and parallax, keep state changes instant.

2. **Animated section reveals**
   - Add a reusable React or vanilla `Reveal` wrapper for major homepage sections.
   - Subtle fade/translate on first view only; no endless looping; no layout shift.
   - Do not hide content from no-JS users: content should be visible by default and animated only after hydration, or use CSS with a safe fallback.

3. **Scroll progress + active navigation**
   - Thin progress bar at the very top of the page.
   - Highlight the current nav item (`About`, `Expertise`, `Selected Work`, `Experience`, `Contact`) using IntersectionObserver.
   - Keyboard accessible; do not break the existing mobile menu.

4. **Interactive case-study cards**
   - Add a restrained pointer-follow glow or border highlight on desktop only.
   - Add a slight lift on hover/focus.
   - Keep all text and links unchanged.
   - Disable pointer effects on touch devices and reduced-motion.

5. **Small CTA polish**
   - Primary `View Selected Work` button: subtle magnetic hover on pointer devices, capped at a few pixels; no jump.
   - Secondary buttons remain visually quieter.
   - Do not add new CTAs or change destinations.

## Hard constraints
- Do NOT add or restore any unverified claim. In particular avoid: `RLHF`, `SOP authoring`, `high-volume`, `hazardous tasks`, named departments (`Production`, `Quality`, `HR`, etc.), `Data Scientist`, `advanced Python/SQL`, `ML`, `PMP`, invented KPIs, project counts, budgets, team sizes.
- Use only facts in `content/profile.json` and the current corrected homepage copy.
- Do NOT change case-study content or labels.
- Do NOT add backend, API keys, login, analytics, tracking, or external data calls.
- Do NOT add Three.js, GSAP, Lottie, or another animation library beyond `framer-motion` unless you first explain why it is necessary and keep the bundle small.
- No layout shift; no horizontal overflow at 390px, 768px, 1024px, 1440px.
- Preserve accessibility: semantic buttons, visible focus, keyboard operation, `aria-pressed`/tab semantics where appropriate, alt text, and reduced-motion support.
- Keep the existing font stack and color tokens in `src/styles/global.css` unless a small addition is needed.
- The final `npm run build` must exit 0.

## Implementation notes
- Use Astro client directives deliberately: `client:load` only for the hero interaction and nav/progress; `client:visible` for below-fold reveals.
- Prefer CSS transitions for simple hover states; use Motion only where it adds real value.
- Keep the hero card compact so the CTA row remains above the fold on a 1440×900 desktop and is reachable quickly on mobile.
- Use inline SVG/CSS for the connector paths; no external images.
- If React integration causes issues with Astro 7, fall back to one vanilla TypeScript island for the hero and document the reason.
- Do not modify `content/` source files.

## Deliverables
1. Working code changes in the repo.
2. A short `INTERACTIVE_NOTES.md` at the project root listing:
   - files added/changed
   - dependencies added
   - interaction behavior
   - accessibility/reduced-motion notes
   - known limitations
3. Run `npm run build` and report the exact result.
4. Do not deploy.

## Verification checklist
- `npm run build` exits 0.
- Homepage loads at `/`.
- Hero stage selector works by click, hover, and keyboard.
- No horizontal scroll at 390px.
- Nav active state updates while scrolling.
- Reduced-motion mode disables nonessential animation.
- No unverified claims introduced.
