# Week 3 — Thinking Chat: CSS Design

**Type:** Thinking (exploratory — no final code produced)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Decide on the visual design direction and CSS architecture before writing any styles.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong thinking chat for this week would cover.

---

## What this conversation explored

- What CSS custom properties (variables) are and why to declare them on `:root`
- How to choose a colour palette that meets WCAG AA contrast (4.5:1 minimum for normal text)
- The difference between Flexbox and Grid — when to reach for each
- What "mobile-first" means in practice: start with the narrow layout, add complexity with `min-width` media queries
- How a hamburger nav works: CSS hides/shows elements, JS toggles a class, CSS responds to that class
- Why `visibility: hidden` is better than `display: none` for animated elements
- What a CSS reset does and why you'd want one

## Sample opening prompt

> "Before I write any CSS, help me think through the design architecture for a dark-themed portfolio site. I want to use CSS custom properties for the colour palette. What variables should I define? How do I check that my text colours have enough contrast? And explain the difference between using Flexbox and Grid — I want to know when to reach for each one."

## What came out of this chat (carried into the build chat)

- A set of six design tokens to define: background, card, border, three text levels, accent colour
- A specific dark purple palette (`#0f0f1a` background, `#8b84ff` accent) with contrast ratios checked
- A decision to use Flexbox for the nav and one-dimensional layouts, Grid for card grids
- Understanding that mobile-first means the default CSS targets narrow screens — wide-screen overrides come in `@media (min-width: …)` blocks, not `@media (max-width: …)`
- A note that the hamburger menu requires three things working together: CSS, JS class toggle, and ARIA attributes
