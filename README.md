# Medina Precision Painting

Marketing website for Medina Precision Painting, a Warner Robins, Georgia painting contractor. The app is built with React, TypeScript, Vite, Tailwind CSS, and Radix UI, and is configured for static deployment to GitHub Pages.

## Prerequisites

- Node.js 20+
- npm 10+

## Local setup

```bash
npm install
cp .env.example .env
```

The project will run without a custom `.env`, but copying `.env.example` makes it easier to configure contact details and form delivery for your environment.

## Environment variables

All client-side settings are optional and safe to leave unset during local development.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public canonical site URL used for metadata |
| `VITE_BUSINESS_EMAIL` | Contact email shown in the UI and used for mailto fallback |
| `VITE_BUSINESS_PHONE` | Digits-only phone number for `tel:` links |
| `VITE_BUSINESS_PHONE_DISPLAY` | Human-friendly phone number shown in the UI |
| `VITE_FORMSPREE_QUOTE_FORM_ID` | Optional Formspree form ID for quote requests |
| `VITE_FORMSPREE_NEWSLETTER_FORM_ID` | Optional Formspree form ID for newsletter signups |
| `VITE_USE_FORMSUBMIT` | Set to `true` to enable FormSubmit fallback POSTs |
| `VITE_FACEBOOK_URL` | Optional Facebook profile/page link |
| `VITE_INSTAGRAM_URL` | Optional Instagram profile link |
| `VITE_GOOGLE_REVIEW_URL` | Google reviews/business listing URL |

## Available scripts

```bash
npm run dev        # start the Vite development server
npm run lint       # run ESLint
npm run typecheck  # run TypeScript checks
npm run build      # typecheck and create a production build
npm run preview    # preview the production build locally
npm run check      # run lint, typecheck, and build in sequence
```

## Development notes

- Local development uses `/` as the default base path.
- GitHub Pages builds use `BASE_PATH=/medina-precision-pai/` in workflow configuration.
- Quote and newsletter submissions validate user input client-side and persist local copies in browser storage for owner review.
- If Formspree is not configured, the app falls back to opening a pre-filled email draft instead of failing silently.

## Deployment

This repository includes:

- `/.github/workflows/ci.yml` for lint, typecheck, and build validation
- `/.github/workflows/deploy-pages.yml` for GitHub Pages deployment on pushes to `main`

To deploy somewhere other than GitHub Pages:

1. Run `npm run build`
2. Upload the contents of `dist/`
3. Set `BASE_PATH` if your site is hosted from a subdirectory
4. Configure the `VITE_*` environment variables for the target environment

## Troubleshooting

### ESLint fails immediately

Run `npm install` again and make sure you are using Node 20+ so the flat ESLint config is supported.

### The site builds locally but assets are broken after deploy

Set the correct `BASE_PATH` for your hosting target. GitHub Pages is already configured in the workflow.

### Quote or newsletter forms do not send

That is expected until Formspree is configured or `mailto:` fallback is allowed by the browser/mail client. Check:

- `VITE_BUSINESS_EMAIL`
- `VITE_FORMSPREE_QUOTE_FORM_ID`
- `VITE_FORMSPREE_NEWSLETTER_FORM_ID`
- `VITE_USE_FORMSUBMIT`

### Validation status

At the time of the latest hardening pass, the project was validated with:

```bash
npm run lint
npm run typecheck
npm run build
```

## Remaining limitations

- There is no backend in this repository, so form delivery depends on client-side providers or `mailto:`.
- There is no automated test suite yet; validation currently relies on linting, typechecking, and production builds.
