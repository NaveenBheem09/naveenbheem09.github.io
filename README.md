# Naveen Srivathsav | Portfolio website

Personal portfolio of **Naveen Srivathsav**, a Databricks-certified Data Engineer based in Chennai, India.

**Live site:** https://naveenbheem09.github.io/

A hand-written static site: plain HTML, CSS and a little JavaScript. There is no framework, no build step and no package to install, so the repository is exactly what gets served.

---

## Contents

- [What the site shows](#what-the-site-shows)
- [Design and features](#design-and-features)
- [Project structure](#project-structure)
- [Run it locally](#run-it-locally)
- [Edit the content](#edit-the-content)
- [Update the documents and photo](#update-the-documents-and-photo)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Custom domain (optional)](#custom-domain-optional)
- [Privacy notes](#privacy-notes)
- [Accessibility and performance](#accessibility-and-performance)
- [Browser support](#browser-support)
- [Credits](#credits)

---

## What the site shows

A single page with numbered sections:

| Section | Content |
|---|---|
| **Hero** | Name, headline, profile photo, short profile summary, call-to-action buttons, quick stats, an illustration of the Bronze / Silver / Gold pipeline layers and a terminal-style profile card |
| **01. Skills & Tools** | Data engineering, languages and databases, data ingestion and integration, BI and analytics, warehousing and quality |
| **02. Experience** | Freelance Data Engineer (Jul 2026 - present), Python Intern (Sep - Nov 2025), Data Analyst at Stats Perform (Mar 2020 - Feb 2024) |
| **03. Projects** | Databricks medallion lakehouse, dbt and SQL transformation layer, electricity bill prediction, sports analytics on Power BI |
| **04. Education & Certifications** | MBA in Data Science and AI (expected 2027), BCA in Data Science (First Class, CGPA 8.22), Databricks and Power BI certifications, plus viewable and downloadable PDFs |
| **05. Contact** | Email, tap-to-call phone button, resume download, GitHub and LinkedIn |

Documents available to view or download from the page:

- Resume (one page)
- BCA Provisional Certificate (page 1 only, date of birth redacted)
- Databricks Certified Data Engineer Associate certificate
- Microsoft Certified: Power BI Data Analyst Associate certificate

---

## Design and features

- **Dark, terminal-inspired look** with a faint grid background, slowly drifting light streaks and soft colour glows.
- **Gradient headline** and monospace labels for a "data platform" feel.
- **Pipeline illustration:** animated flow from source systems through Bronze, Silver and Gold layers. It is an illustration of the layers, not live data.
- **Terminal card:** types out a profile (`cat profile.yaml`) when scrolled into view.
- **Count-up stats** and **scroll-reveal** animations using `IntersectionObserver`.
- **Card spotlight** that follows the mouse pointer.
- **Active navigation link** that follows the section in view.
- **Responsive layout:** two columns on desktop, one column on tablets and phones, with a hamburger menu on small screens.
- **Profile photo** cropped to a circle with a gradient ring, also used as the link-preview image (`og:image`).
- **Reduced motion respected:** animations are switched off for visitors who ask their device for less motion.

---

## Project structure

```
.
├── index.html                  # All page content and markup
├── style.css                   # Styling, theme variables, responsive rules
├── script.js                   # Menu, animations, terminal typing, active nav
├── favicon.svg                 # Browser tab icon
├── .nojekyll                   # Tells GitHub Pages to serve files as they are
├── README.md                   # This file
└── assets/
    ├── profile.jpg                                              # Profile photo (480x480)
    ├── Naveen_Srivathsav_Resume.pdf                             # One-page resume
    ├── Naveen_Srivathsav_BCA_Provisional_Certificate.pdf        # Page 1 only, DOB redacted
    ├── Naveen_Srivathsav_Databricks_Data_Engineer_Associate_Certificate.pdf
    └── Naveen_Srivathsav_Microsoft_Power_BI_Data_Analyst_Associate_Certificate.pdf
```

---

## Run it locally

You can open `index.html` directly in a browser, but a local server is more reliable (some browsers restrict local file loading).

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

Requirements: only a browser, and Python if you use the command above. There is nothing to install or build.

---

## Edit the content

Everything is plain text in the files, so edits are simple.

| To change | Edit |
|---|---|
| Any text, job bullets, project cards, skills | `index.html` |
| Colours (accent, background, card colours) | the `:root { ... }` variables at the top of `style.css` |
| Fonts | the Google Fonts `<link>` in `index.html` and the `--head`, `--body`, `--mono` variables in `style.css` |
| Terminal lines | the `data-lines` attribute on the `#term` element in `index.html` (and the matching static text inside it) |
| Stats numbers | the `data-count` attributes on the `.stats` tiles |
| Email, phone, GitHub, LinkedIn | search `index.html` for `mailto:`, `tel:` and the profile URLs |
| Site title and share text | the `<title>` and `<meta>` tags in the `<head>` of `index.html` |

Tips:

- Keep each experience bullet to one or two lines.
- If you change the terminal text, keep the static text inside the `<pre>` in sync. It is what visitors see if JavaScript is off.
- Phone links use the international form `tel:+91XXXXXXXXXX`.

### Adding a project link

Each project is an `<article class="card spot reveal">` in the Projects section. Add a link like this inside it:

```html
<p><a href="https://github.com/NaveenBheem09/your-repo" target="_blank" rel="noopener">View on GitHub</a></p>
```

---

## Update the documents and photo

Replace the file in `assets/` with a new one **using the same file name**, and the links keep working.

- **Resume:** replace `assets/Naveen_Srivathsav_Resume.pdf`.
- **Certificates:** replace the matching PDF in `assets/`. To add a new certificate, copy one of the existing `class="doc card ..."` blocks in the Education section of `index.html` and point it at the new file.
- **Photo:** replace `assets/profile.jpg` with a square image (around 480x480, under 100 KB works well).

Before publishing any document, check it for personal identifiers such as ID numbers or date of birth. The BCA certificate here is published as page 1 only, with the date of birth blacked out, because the original second page shows a government ID number.

---

## Deployment (GitHub Pages)

The site is hosted free on **GitHub Pages**, served from the `main` branch root.

1. The repository is named `naveenbheem09.github.io`, which GitHub treats as the user site, so it is served at `https://naveenbheem09.github.io/`.
2. In the repository, go to **Settings > Pages**, set **Source** to "Deploy from a branch", choose branch `main` and folder `/ (root)`.
3. Every push to `main` rebuilds the site automatically. Changes usually appear within a minute or two.

To publish an update:

```bash
git add -A
git commit -m "Describe your change"
git push origin main
```

Sign in through the browser window Git opens, or use a short-lived personal access token. Never commit a token to the repository, and revoke any token once you are done with it.

Alternative free hosts that work with this same folder without changes: Cloudflare Pages, Netlify and Vercel (set the build command to none and the output directory to the repository root).

---

## Custom domain (optional)

A custom domain such as a `.dev` address is **not free**; it costs roughly $12 a year from a registrar. The free `github.io` address works without it.

If you buy one:

1. In the repository root, add a file named `CNAME` containing only the domain, for example `example.dev`.
2. At your registrar, add the DNS records GitHub documents under "Managing a custom domain for your GitHub Pages site".
3. In **Settings > Pages**, enter the domain and tick **Enforce HTTPS** once the certificate is ready. `.dev` domains require HTTPS anyway.
4. Update the `og:image` URL in `index.html` to use the new domain.

---

## Privacy notes

This is a public repository and a public website, so everything in it is public, including its Git history.

- The page publishes an **email address** and a **phone number** on purpose, for recruiters.
- The resume PDF also contains the phone number and email.
- The BCA certificate still shows the register number, folio number and ABC ID. Only the date of birth is hidden, and the page with the government ID number is left out.
- Commits carry the author email set in Git. To keep a personal email out of public commits, use GitHub's private `noreply` address in `git config user.email`.
- Removing something from a later commit does **not** remove it from older commits. Deleting history requires rewriting it or recreating the repository.
- Do not commit access tokens, passwords or ID documents.

---

## Accessibility and performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a **skip-to-content** link.
- Visible keyboard focus, `alt` text on the photo, and labelled buttons and icon links.
- Light text on a dark background, with `color-scheme: dark` set.
- The animated and typed effects stop when the visitor prefers reduced motion.
- No JavaScript libraries. Total code is about 40 KB, the profile photo about 30 KB, and fonts are loaded with `display=swap`.
- The content is readable without JavaScript, apart from the scroll animations.

---

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile. The page uses modern CSS (custom properties, grid, `mask-image`, `color-mix`) and `IntersectionObserver`. Older browsers fall back to showing content without the animations.

---

## Credits

- Fonts: [Inter](https://rsms.me/inter/), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), loaded from Google Fonts (SIL Open Font License).
- Icons: small inline SVGs (GitHub and LinkedIn marks belong to their respective owners).
- Built with Claude Code, then reviewed and published by Naveen Srivathsav.

## Contact

- Email: nsrivathsav@gmail.com
- Phone: +91 98402 49713
- GitHub: https://github.com/NaveenBheem09
- LinkedIn: https://www.linkedin.com/in/naveen-srivathsav-dev
