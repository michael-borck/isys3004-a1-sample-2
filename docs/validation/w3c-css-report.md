# W3C CSS Validation Report

**Validator:** https://jigsaw.w3.org/css-validator/
**Method:** By URI (each stylesheet URL)
**Profile:** CSS Level 3 + SVG
**Date:** April 2026

---

## Results

| File | Errors | Warnings | Notes |
|------|--------|----------|-------|
| css/base.css | 0 | ~12 | Vendor extension warnings (expected) |
| css/home.css | 0 | 4 | Vendor extension warnings (expected) |
| css/about.css | 0 | 0 | Clean |
| css/projects.css | 0 | 0 | Clean |
| css/bookshelf.css | 0 | 0 | Clean |
| css/contact.css | 0 | 0 | Clean |
| css/checkpoint.css | 0 | 0 | Clean |

**All stylesheets pass with zero errors.**

---

## About the warnings

All warnings are vendor extension warnings. Two patterns appear:

**1. `-webkit-background-clip` and `-webkit-text-fill-color`**
```css
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```
Used for the gradient text effect on the hero. The `-webkit-` prefixed properties are Safari-specific. The standard `background-clip: text` is included alongside them. The validator flags vendor prefixes as warnings — this is expected and correct practice.

**2. `-webkit-backdrop-filter`**
```css
-webkit-backdrop-filter: blur(12px);
backdrop-filter: blur(12px);
```
Used on the sticky nav for the frosted glass blur. Same pattern: vendor prefix for Safari, standard property alongside it. Both are needed for cross-browser support.

**Warnings do not indicate a problem.** They are the validator noting that prefixed properties are extensions, not part of the official spec. They are universally supported and the recommended approach.

---

## How to validate your own CSS

1. Go to https://jigsaw.w3.org/css-validator/
2. Select the **"By URI"** tab
3. Enter the direct URL of your CSS file (e.g. `https://your-site.netlify.app/css/styles.css`)
4. Click **Check**
5. Screenshot the results

**Alternatively**, use the **"By file upload"** tab to validate a local file before deploying.

**Target:** Zero errors. Vendor extension warnings are expected and acceptable — document them if present so your marker knows you understand what they mean.
