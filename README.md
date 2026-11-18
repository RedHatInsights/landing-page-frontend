# landing-page-frontend

The Hybrid Cloud Console home page — what renders at `console.redhat.com/`.

This repo owns the **dashboard widgets** and a thin shell that mounts the
layout engine. The grid itself — drag-and-drop, resize, lock, expand/collapse,
and the "add widget" drawer — lives in
[`widget-layout`](https://github.com/RedHatInsights/widget-layout). If you are
chasing a layout bug rather than something inside a widget card, start there.

## Getting started

```bash
npm install
npm run start
```

Then open https://stage.foo.redhat.com:1337/.

The dev server proxies to stage by default. A few optional env vars change
what it talks to:

| Variable | Effect |
|---|---|
| `LOCAL_WIDGET_LAYOUT` | proxy `/apps/widget-layout` to `localhost:8003` |
| `CONFIG_PORT` | proxy chrome-service static + dashboard-template routes to a local chrome-service |
| `LOCAL_PDF` | proxy `/api/crc-pdf-generator` to `localhost:8000` |

## Documentation

Architecture, the widget system, and E2E conventions are documented as
Storybook pages under `src/docs/`:

```bash
npm run storybook
```

- **Documentation → Architecture** — render path, module federation, i18n, CI
- **Documentation → Widgets** — widget anatomy and the four-place registration
- **Documentation → E2E Testing** — Playwright conventions and current coverage

[`AGENTS.md`](./AGENTS.md) carries the non-negotiable rules and a docs index,
for both humans and AI agents.

## Testing

| Command | What it runs |
|---|---|
| `npm run test` | everything (unit + Storybook) |
| `npm run test:unit` | Vitest unit tests (happy-dom) |
| `npm run test:storybook` | Storybook interaction tests in headless Chromium |
| `npm run test:watch` | unit tests in watch mode |
| `npm run lint` | ESLint over `src`, `cypress`, `.storybook`, `playwright` |
| `npm run lint:translations` | re-extract messages and fail on drift |

Storybook interaction tests are the primary behavioural coverage. They run via
Vitest browser mode — stories execute directly in Chromium, so there is no
built Storybook and no dev server to start. For a single file during
iteration:

```bash
npx vitest --project=storybook SupportCaseWidget
```

> **Cypress is frozen.** `cypress/` runs in no pipeline and is kept only as a
> porting reference. Do not add new `.cy.ts` specs — new E2E goes in
> `playwright/e2e/`.

### Playwright

Authentication is handled by `@redhat-cloud-services/playwright-test-auth`,
which performs Red Hat SSO login once during global setup and reuses the
session across all tests.

**Requirements:** `E2E_USER` and `E2E_PASSWORD`.

```bash
E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> npm run test:playwright
```

**Targeting a specific environment** — set `PLAYWRIGHT_BASE_URL`:

```bash
PLAYWRIGHT_BASE_URL=https://console.stage.redhat.com \
E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> \
npm run test:playwright
```

**Using a proxy** — if you see a preprod lockdown page when targeting stage,
your Playwright browser likely isn't on VPN:

```bash
PLAYWRIGHT_BASE_URL=https://console.stage.redhat.com \
HTTPS_PROXY=http://<your-corp-proxy>:<port> \
NO_PROXY=localhost,127.0.0.1 \
E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> \
npm run test:playwright
```

**How it works:**
- Authentication happens once via global setup, before any tests run
- The session is stored in `playwright/.auth/user.json`
- All tests reuse it, eliminating repetitive login steps
- Cookie prompts are handled via `disableCookiePrompt` from the package

Other variants: `playwright:headed`, `playwright:ui`, `playwright:debug`,
`playwright:report`.

## Internationalisation

Every user-facing string goes through `react-intl` with an id namespaced
`landing.<area>.<key>`. This is enforced at error by `i18next/no-literal-string`.

After changing any message, re-extract and commit the result — CI fails on
drift:

```bash
npm run extract:messages
```

`translations/messages.json` is generated. The locale catalogs under
`messages/` come from Phrase TMS; never hand-edit them.

### Local i18n validation

The locale-validation workflow builds the i18n CLI, but `npm ci` in this
repository does not install it. Until `@redhat-cloud-services/i18n-pipeline` is
published, build the exact tooling revision pinned by
`.github/workflows/locale-validation.yml` (currently
`7228d32f08872f97c8de8d255b5690e77f484f1f`):

```bash
git clone https://github.com/RedHatInsights/i18n-tooling.git
cd i18n-tooling
git checkout 7228d32f08872f97c8de8d255b5690e77f484f1f
npm ci
npm run build
```

Then, from this repository, add that checkout's CLI to `PATH`:

```bash
PATH="/path/to/i18n-tooling/node_modules/.bin:$PATH" npm run translations:validate
```

This CLI requires Node.js 22.14 or newer. If the workflow pin changes, use the
new SHA in both the checkout and this instruction.

## Deployment

Four branches:

**Stable**
- `prod-stable` → console.redhat.com
- `master-stable` → console.stage.redhat.com

**Beta**
- `prod-beta` → console.redhat.com/beta
- `master` → console.stage.redhat.com/beta
