# Notes for Educators

Context for staff using this repository as a teaching resource.

---

## What this exemplar demonstrates

This is the **advanced** staff exemplar for the Web Fundamentals portfolio. A simpler exemplar also exists (see the unit's staff resources) and is the more appropriate reference for most students.

This site is deliberately more polished than a solid student submission — it achieves Lighthouse 100 on all pages, uses shared component injection, and applies patterns (IntersectionObserver, ARIA live regions, debouncing) that go beyond what the assessment requires. It is useful for:

- Demonstrating professional-grade accessibility and code organisation
- Showing what the ceiling looks like, not the floor
- Illustrating transparent AI-assisted development as a workflow

---

## Transparent AI workflow

This site was built using **Claude Code** (Anthropic's CLI) with a structured planning workflow. The `.superpowers/` and `docs/superpowers/` folders contain artefacts from that process: the brainstorm, the design spec, and the implementation plan.

These folders are left in the repository intentionally. The AI assistance is disclosed in the footer of every page ("This site was built with AI assistance (Claude, Anthropic) and human review and verification") and in the README. The intent is to model transparent, acknowledged AI use — not to hide it.

The assessment brief encourages students to use AI as a thinking and build partner. Leaving these artefacts visible shows one way to do that rigorously and openly.

---

## Deliberate shortfalls

See `KNOWN-ISSUES.md` for the full list. The key ones pedagogically:

**Conversation placeholders** — Claude Code sessions don't export the same way as Claude.ai chat. The placeholder files in `docs/conversations/` model the structure students should aim for. Use this to discuss what a real transcript should contain: the initial brief, the AI response, follow-up corrections, questions about the code.

**Commit history timing** — All commits were made in a concentrated session. The messages and logical groupings are exemplary; the timestamps are not. Useful for a conversation about what "regular commits across five weeks" actually means in practice.

---

## The simpler exemplar vs this one

| | Simpler exemplar | This exemplar |
|---|---|---|
| Pages | 4 | 5 + 5 checkpoint detail pages |
| Lighthouse | 89 | 100 |
| AI tool | Claude.ai chat | Claude Code CLI |
| Patterns | Standard | + IIFE, IntersectionObserver, ARIA live |
| Appropriate as floor? | Yes | No |

Show students the simpler exemplar as the target. Show this one if they ask what the ceiling looks like, or to discuss professional-level accessibility practice.

---

## Deployment note

This site is hosted on **GitHub Pages** (public repo). The assessment brief asks students to use Netlify, which supports private repos and is a more realistic industry deployment experience. GitHub Pages is used here because it works cleanly with a public staff resource and requires no account credentials to share.
