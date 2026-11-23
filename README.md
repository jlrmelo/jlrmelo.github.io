# José Melo — personal site

A Jekyll site with a small custom theme (a landing page plus five detail pages), hosted on GitHub Pages at https://jlrmelo.github.io. It's built locally in Docker, so you don't need Ruby installed, and deployed by GitHub Actions.

Light and dark mode follow the visitor's system setting; the toggle in the top bar overrides it and is remembered in that browser (a few lines of JavaScript in `_layouts/default.html`).

## Pages and content

The landing page (`index.html`, built from `_includes/sections/hero.html`) is a single screen: name, role and headline, two panels
("What I develop" and "Defence & Security Consultant") that link to the detail pages, and the profile buttons.
The detail pages are `/defence/`, `/experience/`, `/publications/`, `/education/` and `/service/`. Each lives in a root `.html` file and uses `_layouts/page.html`.
External links open in a new tab (`target="_blank" rel="noopener"`); links between the site's own pages open in the same tab.

| What | Where |
|---|---|
| Name, role, headline (with the two highlighted words), focus tags, key figures, bio, profile links, the "Get in touch" button (`contact:`, which links to `/contact/`; `contact.web3forms_key` is the Web3Forms access key, empty shows LinkedIn instead of the form), photo | `_data/profile.yml`. The photo is `assets/img/profile.webp`: a metadata-free, 440px-wide transparent cutout (twice its largest display size). The original is kept, unpublished, in `_private/`. |
| Defence & Security consulting | `_data/advisory.yml` (the intro appears in the landing-page panel; the engagements appear on `/defence/`) |
| Experience | `_data/experience.yml` |
| Education | `_data/education.yml` |
| Awards & honours (on `/education/`) | `_data/honours.yml` |
| Academic service: teaching, supervision, reviewing, conference roles (on `/service/`, in file order) | `_data/service.yml` |
| Publications | `_bibliography/publications.bib`, rendered by jekyll-scholar via `_layouts/bib.html`. Grouped by `@Article`, `@InProceedings` and `@TechReport`. |
| Navigation | `_data/navigation.yml` (`short` is the label used on phones) |
| Styles (colours, type, spacing) | `assets/css/main.scss`. The tokens at the top set light and dark mode. |
| Contact page (`/contact/`) | `contact.html` and `assets/js/contact.js`. The Web3Forms key is `contact.web3forms_key` in `_data/profile.yml`. |

### Contact form setup

The form posts to [Web3Forms](https://web3forms.com), which forwards messages to an inbox. The inbox address is set in the Web3Forms dashboard, not in this repo, so it never appears in the published site.

1. Create an access key at web3forms.com for the inbox address.
2. In the Web3Forms dashboard, enable hCaptcha for the form.
3. Paste the key into `contact.web3forms_key` in `_data/profile.yml`. An empty key hides the form and shows a LinkedIn link instead.

The key is public by design: it ends up in the page source, and on its own it can only send to the inbox set in Web3Forms. After deploying, send a test message from `/contact/`.

`_private/` is gitignored and never published. Keep the full CV there.

## Local development

You need Docker. Run the scripts from anywhere in the repo:

| Command | What it does |
|---|---|
| `scripts/serve` | Serves the site with live reload at http://localhost:4000. Stop it with Ctrl-C. |
| `scripts/build` | Production build into `_site/` |
| `scripts/check` | Runs the build, then checks internal links and HTML with html-proofer (the same check CI runs) |
| `scripts/update [gem...]` | Updates gems. Commit the new `Gemfile.lock` afterwards. |

The first run installs gems into `vendor/bundle`, which is gitignored. After that, runs start quickly.

## Deployment

Pushing to `main` runs `.github/workflows/pages.yml`, which builds, checks, and deploys the site. It also reruns on the 1st of every month, so the footer year stays current.
`.github/workflows/links.yml` checks external links monthly (or on demand from the Actions tab) without blocking deploys. GitHub pauses scheduled workflows after 60 days without commits; re-enable them from the Actions tab.
One-time setup: the GitHub repository must be named `jlrmelo.github.io`; then go to **Settings → Pages → Source** and select **GitHub Actions**.

## Search engines and LLMs

- **Per-page descriptions**: the `description:` front matter of each page (and `description` in `_config.yml` for the landing page). Keep them under ~160 characters.
- **Structured data (JSON-LD)**: `_includes/jsonld-person.html` (landing page: Person/ProfilePage) and `_includes/jsonld-publications.html` (Publications: ScholarlyArticle per paper, generated from the `.bib` by `_plugins/scholarly_data.rb`). Identity details live in `_data/seo.yml`.
- **Social preview card**: `assets/img/og-card.jpg` (1200×630, kept under 300 KB so WhatsApp shows it), set as the default `image` in `_config.yml`.
- **`/llms.txt`**: a plain-text summary for AI assistants, built from `_data/profile.yml`, `_data/seo.yml` and the page descriptions.
- After publishing, verify the site in Google Search Console and submit `https://jlrmelo.github.io/sitemap.xml`. Test the structured data with Google's Rich Results Test.
