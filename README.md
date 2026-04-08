# landing-page-frontend

[![Build Status](https://travis-ci.org/RedHatInsights/landing-page-frontend.svg?branch=master)](https://travis-ci.org/RedHatInsights/landing-page-frontend)

## Getting Started

There is a [comprehensive quick start guide in the Storybook Documentation](https://github.com/RedHatInsights/insights-frontend-storybook/blob/master/src/docs/welcome/quickStart/DOC.md) to setting up an Insights environment complete with:

- [Insights Frontend Starter App](https://github.com/RedHatInsights/insights-frontend-starter-app)
- [Insights Chroming](https://github.com/RedHatInsights/insights-chrome)
- [Insights Proxy](https://github.com/RedHatInsights/insights-proxy)

## Getting started

1. ```npm install```

2. ```npm run start```

Checkout https://stage.foo.redhat.com:1337/ [Read more](https://github.com/RedHatInsights/frontend-components/tree/master/packages/config#useproxy).

## Testing

- `npm run test` tests
- `npm run lint` will run the linter

### Cypress

Opens the Cypress GUI for running end-to-end tests. Similar to `npm test`, this script requires environment variables for authentication:

```bash
E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> npm run cypress -- open
```

Replace the placeholders with appropriate values.

This script requires running the application locally. If you want to use stage environment you have to provide `URL` and `HTTP_PROXY` variables

```bash
URL=https://console.stage.redhat.com HTTP_PROXY=<corporate-proxy-URL> E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> npm run cypres -- open
```

If you want to use production site you can use just the URL

```bash
URL=https://console.redhat.com E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> npm run cypres -- open
```

### Playwright

Run the Playwright E2E tests. Authentication is handled automatically via the `@redhat-cloud-services/playwright-test-auth` package, which performs Red Hat SSO login once during global setup and reuses the authenticated session across all tests.

**Requirements:**
- `E2E_USER` and `E2E_PASSWORD` environment variables

**Basic usage:**

```bash
E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> npm run test:playwright
```

**Targeting a specific environment:**

Set `BASE` (or reuse `URL`) to point at different environments:

```bash
BASE=https://cloud.redhat.com E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> npm run test:playwright
```

**Using a proxy:**

If you see a **preprod lockdown page** when targeting stage, your Playwright browser likely isn’t on VPN. In that case, run with a proxy:

```bash
BASE=https://console.stage.redhat.com \
HTTPS_PROXY=http://<your-corp-proxy>:<port> \
NO_PROXY=localhost,127.0.0.1 \
E2E_USER=<your-e2e-user> E2E_PASSWORD=<your-e2e-password> \
npm run test:playwright
```

**How it works:**
- Authentication happens once via global setup (before any tests run)
- The authenticated session is stored in `playwright/.auth/user.json`
- All tests automatically use this session, eliminating repetitive login steps
- Cookie prompts are handled by importing `disableCookiePrompt` from the package

## Deployment

The following four branches are used

- Stable
  - prod-stable -> releases to console.redhat.com
  - master-stable -> releases to console.stage.redhat.com

- Beta
  - prod-beta -> releases to console.redhat.com/beta
  - master -> releases to console.stage.redhat.com/beta

