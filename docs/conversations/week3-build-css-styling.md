# Week 3 — Build Chat: CSS Styling

**Type:** Build (focused — arrived with a clear brief from the thinking chat)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Produce the CSS stylesheet and visual design.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong build chat for this week would cover.

---

## What this conversation produced

- `css/base.css` with design tokens, CSS reset, nav styles, footer styles, and utility classes
- `css/home.css` with hero section, skills strip, and featured cards
- Page-specific stylesheets for about, projects, bookshelf, and contact pages
- Responsive breakpoints using `min-width` (mobile-first)
- Hamburger menu CSS with `visibility` toggling and transition

## Sample opening prompt

> "I need CSS for a dark-themed portfolio. The design tokens:
> - `--bg-deep: #0f0f1a` (page background)
> - `--bg-card: #1a1a2e` (card background)
> - `--text-primary: #e0e0ff`
> - `--accent-purple: #8b84ff`
> - `--nav-height: 64px`
>
> Requirements:
> - Declare all tokens on `:root`
> - Mobile-first: default styles target narrow screens, use `min-width` media queries for wide
> - Nav is sticky, 64px tall, blur backdrop, hides the hamburger button on wide screens
> - On narrow screens: hamburger shown, nav links slide in as a full-screen overlay using `visibility` + `transform` transition
> - No inline styles. No `!important`.
> Start with `base.css`."

## Follow-up corrections made

- First nav output used `display: none` for the mobile menu — asked to change to `visibility: hidden` so the CSS transition would work
- Contrast check on the muted text colour failed (3.31:1) — asked the AI to explain the issue and suggest a fix that met 4.5:1
- Initial mobile nav used `max-width: 768px` — corrected to `min-width: 48rem` to match the mobile-first approach

## Questions asked about the code

- "What's the difference between `position: sticky` and `position: fixed`?"
- "Why does `backdrop-filter: blur()` sometimes not work?"
- "What does `clamp()` do in a font-size declaration?"
