# flooringsurgeons.co.uk — Off-Page SEO Audit (GitHub Pages)

A static, password-gated, interactive report comparing flooringsurgeons.co.uk's
backlink profile against 12 UK flooring competitors, built from an Ahrefs
export + the `backlink_analysis.py` analysis script.

## Deploy to GitHub Pages

1. Create a new GitHub repository (a **private** repo is strongly recommended — see note below).
2. Add these four files to the repo root: `index.html`, `style.css`, `script.js`, `data.js`.
3. Commit and push.
4. In the repo: **Settings → Pages → Source** → select the `main` branch, `/ (root)` folder → Save.
5. GitHub will give you a URL like `https://<username>.github.io/<repo>/`. It takes a minute or two to go live.

## Changing the access phrase

The default password is `flooring2026`. To change it:

1. Open any browser console (F12) and run:
   ```js
   crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourNewPassword'))
     .then(buf => console.log([...new Uint8Array(buf)]
       .map(b => b.toString(16).padStart(2,'0')).join('')))
   ```
2. Copy the printed 64-character string.
3. In `script.js`, replace the value of `PASSWORD_HASH` near the top of the file with it.
4. Commit and push.

## ⚠️ Security note — please read

**This is a soft deterrent, not real security.** GitHub Pages serves static
files to anyone with the URL — there's no server to check a password against.
The gate in this project just hides the content behind a form and checks a
SHA-256 hash *in the visitor's own browser*. That means:

- Anyone who opens dev tools can read `data.js` directly, hash-guess short
  passwords offline, or just delete the `hidden` attribute on `#app`.
- It **will** stop Google from indexing the page (there's a `noindex` meta
  tag) and will stop casual visitors who stumble on the link.
- It will **not** stop a determined competitor from viewing the data.

If this report needs real protection (and competitive backlink data
probably does), use one of these instead:
- A **private** GitHub repository with GitHub Pages access controls
  (requires GitHub Pro, Team, or Enterprise — Pages from private repos are
  only viewable by people with repo access).
- Host the same files behind actual authentication (Netlify/Vercel password
  protection, Cloudflare Access, a simple server with real auth, etc.).

## Updating the data

All figures live in `data.js`. When you re-run the backlink analysis script
on a fresh Ahrefs export, pull the updated numbers from the new
`backlink_analysis_report.xlsx` (Summary, Weaknesses vs Competitors, DR
Distribution, Anchor Insights, Link Velocity, Homepage vs Internal Links,
Overlap With Competitors, Top Referring Domains, and Link Gap Opportunities
sheets) and update the corresponding arrays in `data.js`. No other file
needs to change.
