# TAJ Engineering & Project Services

Website for TAJ Engineering & Project Services, a division of TAJ Transformers Ltd.

**Site:** https://tajengineering.com.ng

## About

TAJ Engineering & Project Services provides independent, owner-side oversight for property owners and developers in Ibadan, Oyo State, Nigeria: pre-construction readiness reviews, construction-stage monitoring, materials and workmanship control, building condition screening, and handover/defect close-out support.

Formal structural certification, statutory design responsibility, laboratory testing and other regulated professional opinions are separate scopes, handled by appropriately registered professionals where required.

## Tech stack

Static HTML, CSS and JavaScript. No build step, no framework, no dependencies.

## Local development

Open `index.html` directly in a browser, or serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

## Project structure

```
.
├── index.html                       # Main site
├── privacy.html, terms.html, 404.html
├── manifest.webmanifest, robots.txt, sitemap.xml
├── assets/                          # Styles, scripts, images, icons
├── EVIDENCE_SOURCES.md              # Sourcing guidelines for the evidence section
├── WEBSITE_AUDIT_AND_CHANGELOG.md   # Version history
└── FINAL_QA_REPORT.md               # QA checklist
```

## Deployment

The repository is deployable as-is to any static host (GitHub Pages, Netlify, Vercel, traditional web hosting) — no build step required.

## Content guidelines

Claims in the evidence section must stay attributed to the named source. See `EVIDENCE_SOURCES.md` before editing it.

## License

© TAJ Engineering & Project Services, a division of TAJ Transformers Ltd. All rights reserved.
