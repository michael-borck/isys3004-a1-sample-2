# Lighthouse Audit Report

**Tool:** Lighthouse (Chrome DevTools / CLI)
**Pages tested:** All pages
**Mode:** Mobile
**Date:** April 2026
**Live URL:** https://michael-borck.github.io/isys3004-a1-sample-2/

---

## Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| index.html | 100 | 100 | 100 | 100 |
| about.html | 100 | 100 | 100 | 100 |
| projects.html | 100 | 100 | 100 | 100 |
| bookshelf.html | 100 | 100 | 100 | 100 |
| contact.html | 100 | 100 | 100 | 100 |
| checkpoint-1.html | 100 | 100 | 100 | 100 |
| checkpoint-2.html | 100 | 100 | 100 | 100 |

---

## Passing accessibility audits (selected)

- Image elements have `[alt]` attributes
- `[lang]` attribute present on `<html>`
- `<html>` element has a valid `lang` attribute
- Buttons have accessible names
- All heading elements are in a sequentially descending order
- Navigation landmark present
- `[aria-*]` attributes match their roles
- `[aria-expanded]` is used on compatible elements
- `[aria-hidden="true"]` is not present on the document `<body>`
- Links have discernible names
- Form elements have associated labels
- `[id]` attributes are unique
- Background and foreground colours have sufficient contrast
- Colour is not the only means of conveying information

---

## Issues fixed during development

Several accessibility failures were caught during development and resolved before final audit:

| Issue | Root cause | Fix |
|-------|-----------|-----|
| Text contrast fail | `--text-muted: #666` (3.31:1 ratio) | Changed to `#7a7aa8` (passes 4.5:1) |
| Accent contrast fail | `--accent-purple: #6c63ff` (4.41:1) | Changed to `#8b84ff` (passes 4.5:1) |
| Screen reader noise | `aria-live` on animated text read each character | Separated into `aria-hidden` visual + silent `aria-live` announcement region |
| Hidden nav in tab order | `display: none` on mobile nav didn't remove from tab order | Changed to `visibility: hidden` + `visibility: visible` on open |

---

## How to run Lighthouse yourself

**In Chrome DevTools:**
1. Open the page in Chrome
2. Open DevTools (F12 or Cmd+Option+I)
3. Go to the "Lighthouse" tab
4. Select Mobile, check all categories, click "Analyse page load"

**Via CLI (requires Node.js):**
```
npm install -g lighthouse
lighthouse https://your-netlify-url.netlify.app --output html --output-path ./lighthouse-report.html
```

**Target:** Accessibility ≥ 90 (per assessment brief). A score of 100 on all pages is achievable with careful ARIA attribute use and colour contrast checking throughout development.
