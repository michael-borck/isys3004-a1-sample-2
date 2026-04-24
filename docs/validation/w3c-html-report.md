# W3C HTML Validation Report

**Validator:** https://validator.w3.org/nu/
**Method:** URL check (Address tab)
**Date:** April 2026

---

## Results

| Page | URL | Errors | Warnings |
|------|-----|--------|----------|
| Home | /index.html | 0 | 0 |
| About | /about.html | 0 | 0 |
| Projects | /projects.html | 0 | 0 |
| Bookshelf | /bookshelf.html | 0 | 0 |
| Contact | /contact.html | 0 | 0 |
| Checkpoint 1 | /checkpoint-1.html | 0 | 0 |
| Checkpoint 2 | /checkpoint-2.html | 0 | 0 |
| Checkpoint 3 | /checkpoint-3.html | 0 | 0 |
| Checkpoint 4 | /checkpoint-4.html | 0 | 0 |
| Checkpoint 5 | /checkpoint-5.html | 0 | 0 |

**All pages pass with zero errors and zero warnings.**

---

## Issues fixed during development

Common HTML validation errors that were caught and corrected:

| Error | Where found | Fix |
|-------|-------------|-----|
| `type="text/css"` on `<link>` | All pages | Removed (redundant in HTML5) |
| `type="text/javascript"` on `<script>` | All pages | Removed (redundant in HTML5) |
| `aria-label` as a CSS property | `base.css` | Removed from CSS; kept as HTML attribute only |
| Stray `</div>` closing tag | `projects.html` | Corrected nesting |

---

## How to validate your own pages

1. Go to https://validator.w3.org
2. Select the **"Address"** tab
3. Paste your Netlify or GitHub Pages URL (e.g. `https://your-site.netlify.app/about.html`)
4. Click **Check**
5. Screenshot the results page for each HTML file

**Target:** Zero errors. Warnings are lower priority but should be investigated.

**Tip:** Validate each page individually. An error on `index.html` does not guarantee the same error appears on `contact.html` — validate all pages before submitting.
