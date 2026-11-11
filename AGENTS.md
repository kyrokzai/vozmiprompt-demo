# VOZMI PROMPT

Use the existing checkout; cloud tasks are isolated. Work on a dedicated branch. Inspect code and git status before major tasks, preserve existing user changes.

## Approval
Preparation and audit are authorized. Implementation of VOZMI PROMPT 2.0 requires the user's approval of the plan in PREPARATION.md. Never publish, push to production, or change the deployed site without explicit authorization. Keep the old design and original media recoverable.

## VOZMI DESIGN SYSTEM
Premium Creative Agency / Cinematic / Modern Minimalism. Black background, graphite surfaces, white text, neon lime accent. Existing reference tokens: background #090b0b, panel #141817, ink #f9f7ed, muted #b9c0bb, accent #d9ff43, border #353d39. Preserve brand identity and approved logos. The requested original VP monogram must come from the owner or an approved existing asset; do not invent a replacement. Use the author's work, never random stock substitutes.

Prioritize composition, readable typography, restrained motion and mobile quality. Support reduced motion, keyboard navigation and touch. Evaluate performance before adding heavy effects or dependencies. React is not currently used and is not a prerequisite.

## Development
Static HTML/CSS/JavaScript; no package.json or build. Serve using `python3 -m http.server 8000 --bind 127.0.0.1 --directory /workspace/vozmiprompt-demo`.
After changes, check affected behavior with Playwright and Chromium, widths 320/375/390/430/768/1440, keyboard and reduced motion. Run Lighthouse after media or layout changes. Distinguish local lab results from field Core Web Vitals. Do not send real test enquiries. Preserve existing files and settings.
