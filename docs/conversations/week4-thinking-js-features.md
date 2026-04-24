# Week 4 — Thinking Chat: JavaScript Features

**Type:** Thinking (exploratory — no final code produced)
**Tool:** Claude.ai chat (or Claude Code)
**Purpose:** Decide which JavaScript features to build, understand the mechanisms, and plan before writing any code.

---

> **Placeholder:** A real submission would contain the full exported conversation transcript. This file describes what a strong thinking chat for this week would cover.

---

## What this conversation explored

- What JavaScript can and can't do in a static site (no server, no database)
- How the hamburger menu mechanism works: the three-layer model (CSS hides/shows, JS toggles class, ARIA communicates state)
- What `addEventListener` does and why event listeners are better than inline `onclick` attributes
- What `aria-expanded` is for and when to update it
- How an IIFE (`(function(){ … })()`) prevents variables from leaking into global scope
- What `IntersectionObserver` does, and why it's better than listening to the scroll event for reveal animations
- What `querySelector` and `querySelectorAll` return and how they differ

## Sample opening prompt

> "I want to add three JavaScript features to my portfolio: (1) a hamburger nav that opens/closes on mobile, (2) scroll-reveal animations on page elements, and (3) an active nav link that reflects the current page. Before I write any code, help me understand how each one works mechanically. Focus on the concepts — I'll write the code in a separate chat."

## What came out of this chat (carried into the build chat)

- A clear three-step model for the hamburger menu: CSS controls visibility, JS toggles a class, CSS reacts to that class
- Understanding that `aria-expanded` must be updated every time the menu state changes
- A decision to use `IntersectionObserver` for scroll reveal (efficient, no scroll listener needed)
- A note that the active nav link can be detected by comparing `location.pathname` to each link's `href`
- Understanding that a guard check (`if (!toggle) return`) prevents errors on pages where an element doesn't exist
