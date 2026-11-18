# Landing Page Frontend — Agent Context

The Hybrid Cloud Console home page (`console.redhat.com/`). This repo is deliberately thin: it owns a **set of dashboard widgets** and a **shell that mounts someone else's layout engine**. Almost every change here is a widget change.

Built on PatternFly 6 (design system), react-intl (i18n), Scalprum + Webpack Module Federation (runtime composition), and Storybook as the primary development and testing environment. Playwright handles E2E against stage.

## Architecture

**This app does not route.** Chrome mounts module `./RootApp` at `/` with `exact: true` (see `frontend.yml` → `module.modules`). Any navigation away from `/` stops matching and unmounts the app. There is nothing to route to inside this repo — do not add a router, routes, or route guards.

The render path is four hops:

```
chrome  →  ./RootApp (src/moduleEntries/AppEntry.tsx)   # wraps IntlMessagesProvider
        →  src/App.tsx                                   # sets document title, Suspense boundary
        →  src/features/landing/Landing.tsx              # <ScalprumComponent scope="widgetLayout" module="./WidgetLayout" />
        →  widget-layout (SEPARATE REPO)                 # the actual grid/layout engine
```

**The dashboard grid, drag-and-drop, resize, lock, expand/collapse, and the "add widget" drawer all live in [`widget-layout`](https://github.com/RedHatInsights/widget-layout), not here.** If a bug is about layout behavior rather than what's inside a widget card, it is almost certainly not fixable in this repo. Check before writing code.

What this repo actually owns:

- **`src/widgets/`** — the widget components. Each is independently exposed as a federated module and consumed at runtime by `widget-layout`. This is the primary surface.
- **`src/moduleEntries/`** — federated entry points. `AppEntry.tsx` (`./RootApp`) is the console shell entry. `PdfEntry.tsx` (`./PdfEntry`) is loaded standalone by the crc-pdf-generator service, which does **not** provide react-intl — that file is deliberately excluded from the i18n lint rule and must stay untranslated.
- **`src/i18n/`** — `IntlMessagesProvider` + `useChromeLocale`. Locale comes from Chrome; `useChromeLocale` is a temporary shim that will be replaced by chrome's own hook of the same name and signature (RHCLOUD-52203). Keep its shape.
- **`frontend.yml`** — the Frontend CRD. Widget registration and default dashboard layouts live here, not in code.

**Widget composition**: most widgets are thin configurations of `SimpleServiceWidget` (`src/widgets/SimpleServiceWidget.tsx`) — a shared card with an icon, body copy, and a link. `AcsWidget`, `AnsibleWidget`, `EdgeWidget`, `ImageBuilderWidget`, `OpenShiftWidget`, `OpenShiftAiWidget`, `QuayWidget`, and `RhelWidget` are all this shape. Prefer extending `SimpleServiceWidget` over hand-rolling a new card.

Only two widgets are non-trivial: `RecentlyVisited` (reads Chrome state) and `SupportCaseWidget` (the only widget in the repo that makes a network call).

## Testing

Storybook stories with play functions are the first-class test artifact. `npm run test:storybook` runs them in Vitest browser mode (stories execute directly in headless Chromium — no built Storybook, no dev server, no ports). It runs on every PR via `.github/workflows/storybook.yml`.

For fast iteration, target a file or test name: `npx vitest --project=storybook <pattern>`. Never run the full suite while iterating.

Unit tests (`npm run test:unit`, Vitest + happy-dom) exist for the shell, but **Storybook interaction tests are what carry behavioral coverage**. Playwright (`npm run test:playwright`) runs against live stage in the Konflux PR pipeline.

## Team standards

This repo follows the Experience UI team standards. They are the baseline; the non-negotiables below extend them, they do not replace them.

- [standards/index.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/index.md) — start here
- [testing.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/testing.md) · [mocking.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/mocking.md) · [data-layer.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/data-layer.md) · [e2e.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/e2e.md) · [code-style.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/code-style.md) · [architecture.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/architecture.md) · [ci.md](https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/ci.md)

---

## Non-negotiables (apply without reading further)

Each rule is tagged with its enforcement status. **[lint]** means CI rejects a violation today. **[review]** means it is currently caught only by a human or not at all — treat it as binding regardless.

1. **Adding or renaming a widget touches four places.** Miss one and the widget silently never appears. **[review]**
   1. `src/widgets/<Name>.tsx` — the component
   2. `fec.config.js` → `moduleFederation.exposes['./<Name>']` — makes it loadable at runtime
   3. `frontend.yml` → `widgetRegistry` — makes it selectable in the "add widget" catalog (`scope: "landing"`, `module: "./<Name>"`, `config.title`, `config.icon`, optional `featureFlag`, `defaults` sizing)
   4. `frontend.yml` → `baseWidgetLayouts.templateConfig` — places it on the default dashboard, and this must be done for **all four breakpoints** (`sm`, `md`, `lg`, `xl`), not just one

   Note the two ID formats are different and both are load-bearing: `baseWidgetLayouts` uses `landing-./<Name>#<key>`, while the runtime DOM OUIA id that E2E tests select on is `landing-./<Name>-widget`.

   Known current state: `EdgeWidget` and `QuayWidget` are exposed in `fec.config.js` but appear in neither `widgetRegistry` nor `baseWidgetLayouts` — they are unreachable in the product. Do not treat them as examples of correct wiring.

2. **Every widget needs a `.stories.tsx` with a play function.** A widget without an interaction test is not done. **[review]**

3. **Play functions must exercise behavior, not just rendering.** If the component has an `onClick`, `onChange`, or `onSelect`, the story must drive it with `userEvent` and assert the resulting state change. `expect(getByText(...)).toBeInTheDocument()` alone is a rendering check, not behavioral verification. Import test utilities from `storybook/test` (no `@` prefix): `import { userEvent, within, expect, fn, waitFor } from 'storybook/test'`. **[review]**

4. **No snapshot tests.** `toMatchSnapshot()` is banned — it asserts nothing about behavior and passes on any change once regenerated. The two surviving snapshot tests in `src/__tests__/App.test.tsx` and `src/features/landing/Landing.test.tsx` are legacy debt, not precedent. Do not add more; delete them when you touch those files. **[review]**

5. **No inline MSW handlers in stories.** Handlers belong in typed factories under `src/data/mocks/`, imported by stories. Inline `http.get`/`http.post` in a story file duplicates URL literals and drifts silently when the API changes. `SupportCaseWidget.stories.tsx` currently violates this — it is the thing to fix, not the pattern to copy. **[review]**

6. **No hardcoded entity strings in play functions.** Reference seed constants from `src/data/mocks/`, not inline string literals. **[review]**

7. **Server state uses TanStack Query, not `fetch` in `useEffect`.** Direct `fetch()` calls in `src/` are a lint error. New data-fetching code uses TanStack Query with an API client under `src/data/api/`. `SupportCaseWidget.tsx` carries the one documented suppression — it pre-dates the standard and is scheduled for migration. Do not add a second one; if you think you need it, you need a client instead. **[lint]**

8. **Every user-facing string goes through react-intl.** `i18next/no-literal-string` runs at **error** over `src/**` (excluding tests, stories, and `PdfEntry.tsx`). Message IDs are namespaced `landing.<area>.<key>` — e.g. `landing.acs.body`, `landing.explore.rosa.title`. Two legacy bare IDs (`ansible`, `insights`) predate the convention; do not add more. **[lint]**

9. **Translation catalogs are generated, never hand-edited.** `translations/messages.json` is the extraction output. After changing any message, run `npm run extract:messages` and commit the result — `npm run lint:translations` fails CI on drift via `git diff --exit-code`. The locale files under `messages/` (`fr`, `ja`, `ko`, `zh-CN`) come from Phrase TMS; do not edit them by hand. **[lint]**

10. **PatternFly imports use dynamic sub-paths**, never global imports: `import { Spinner } from '@patternfly/react-core/dist/dynamic/components/Spinner'`. Icons use absolute paths: `import RocketIcon from '@patternfly/react-icons/dist/js/icons/rocket-icon'`. Global imports pull the entire library into the federated bundle. `src/App.tsx` is the correct example; `src/features/landing/Landing.tsx` still uses a global import and should be fixed when touched. **[review]**

11. **Playwright is the E2E framework. Cypress is frozen, not deleted.** The `cypress/` directory, `cypress.config.ts`, `scripts/e2e.js`, and `run-e2e.sh` remain in the tree but run in no CI pipeline. Per team standards (`experience-ui-governance/standards/testing.md`): *"Existing Cypress tests are legacy — do not count them as passing behavioral verification or E2E maturity. Do not write new Cypress tests."*

    Concretely: never add or extend a `*.cy.ts` file, and do not read `cypress/e2e/` as a statement of current coverage — it is kept as a porting reference only. All new E2E goes in `playwright/e2e/`. The one capability Playwright has not yet ported is the add-widget-from-catalog flow (`cypress/e2e/widgets/integrations.cy.ts`); `LandingPage.addWidget()` already exists for it. **[review]**

12. **E2E specs use the timeout constants, and prefer role or test-id queries.** Waits use `TIMEOUTS` from `playwright/constants.ts` — a raw millisecond value in a spec is a lint error. **[lint]**

    For selectors: prefer `getByRole` / `getByTestId` / the `LandingPage` page object. A CSS class or ID selector needs a reason, because it couples the test to markup the app doesn't own. The specs currently carry ~28 `page.locator()` calls, several of them Cypress-era hooks (`.tooltip-button-settings-cy`, `#widget-layout-container`) inherited verbatim during the migration. Those are debt to pay down when you next touch the file, not a pattern to extend. **[review]**

13. **`playwright/` is linted.** The lint script covers `src cypress .storybook playwright`. Keep it that way — a directory dropped from the script is a directory where every other rule here silently stops applying. **[lint]**

14. **Do not add a router, Redux, or a state management library.** The app has one route owned by chrome and no global client state. Widget-local `useState` is sufficient; anything more is a sign the change belongs in `widget-layout`. `redux`, `react-redux`, `@reduxjs/toolkit`, and `redux-promise-middleware` imports are a lint error. **[lint]**

15. **Conventional commits.** No git operations unless explicitly requested. **[review]**

---

## Docs index

Read the relevant file before writing code. Prose docs live in `src/docs/` as
MDX and render as the Documentation section of Storybook (`npm run storybook`);
they are plain text files, so read them directly.

```text
root: src/docs/

architecture:               Architecture.mdx   # render path, Scalprum boundary, federation, i18n, CI
what-this-repo-owns:        Architecture.mdx § The one thing to know first
widget-anatomy:             Widgets.mdx        # two-export pattern, SimpleServiceWidget
widget-registration:        Widgets.mdx § Registering a widget touches four places
widget-wiring-state:        Widgets.mdx § Current wiring state
writing-a-story:            Widgets.mdx § Every widget needs a story
e2e-conventions:            E2ETesting.mdx     # page object, TIMEOUTS, running locally
e2e-coverage-map:           E2ETesting.mdx § Current coverage
e2e-known-gaps:             E2ETesting.mdx § Known gaps

repo files:
  local-dev-setup:          README.md § Getting started
  frontend-crd-schema:      https://raw.githubusercontent.com/RedHatInsights/frontend-components/refs/heads/master/packages/config-utils/src/feo/spec/frontend-crd.schema.json
  layout-engine:            https://github.com/RedHatInsights/widget-layout  (separate repo)
  storybook-config:         .storybook/main.ts, .storybook/preview.tsx
  ci-pipelines:             .tekton/landing-page-frontend-pull-request.yaml, .github/workflows/storybook.yml
  i18n-pipeline:            .github/i18n/catalog-validation.json, .github/workflows/locale-validation.yml
  ownership:                .github/CODEOWNERS
  contributing:             .github/pull_request_template.md

team standards (external):
  index:                    https://github.com/RedHatInsights/experience-ui-governance/blob/main/standards/index.md
  storybook-testing:        .../standards/testing.md
  msw-handler-factories:    .../standards/mocking.md
  tanstack-query:           .../standards/data-layer.md
  playwright-structure:     .../standards/e2e.md
```

---

## Key file locations

```text
src/
├── App.tsx                          # Shell: document title + Suspense. No routing.
├── moduleEntries/
│   ├── AppEntry.tsx                 # ./RootApp — console entry, wraps IntlMessagesProvider
│   └── PdfEntry.tsx                 # ./PdfEntry — standalone for crc-pdf-generator; NO react-intl
├── features/landing/
│   └── Landing.tsx                  # Mounts widgetLayout/./WidgetLayout via ScalprumComponent
├── widgets/                         # THE PRIMARY SURFACE — one federated module each
│   ├── SimpleServiceWidget.tsx      # Shared card base: icon + body + link
│   ├── AcsWidget.tsx                # ─┐
│   ├── AnsibleWidget.tsx            #  │
│   ├── EdgeWidget.tsx               #  │ thin SimpleServiceWidget configs
│   ├── ImageBuilderWidget.tsx       #  │
│   ├── OpenShiftWidget.tsx          #  │
│   ├── OpenShiftAiWidget.tsx        #  │
│   ├── QuayWidget.tsx               #  │
│   ├── RhelWidget.tsx               # ─┘
│   ├── ExploreCapabilities.tsx      # Static marketing grid
│   ├── RecentlyVisited.tsx          # Reads Chrome visited-pages state
│   ├── SupportCaseWidget.tsx        # ONLY widget with a network call (access.redhat.com)
│   ├── SupportCaseWidgetFilter.tsx  # Severity/status dropdowns — interactive, NO story yet
│   └── SupportCaseWidgetConsts.tsx  # Filter option constants
├── docs/                            # Prose docs (MDX) — renders as Storybook "Documentation"
│   ├── Architecture.mdx
│   ├── Widgets.mdx
│   └── E2ETesting.mdx
├── data/
│   ├── api/support-case.types.ts    # Canonical API contract for the support case endpoint
│   └── mocks/                       # Typed MSW handler factories + seed fixtures
├── i18n/
│   ├── IntlMessagesProvider.tsx     # Lazy-loads catalog for locale
│   ├── useChromeLocale.ts           # Temporary shim — will be replaced by chrome's hook
│   └── messageCatalogs.ts
├── utils/
│   ├── getEnv.ts
│   ├── sanitize-href.ts
│   └── axiosInstance.ts             # DEAD: imports axios (not a dependency), nothing imports it
└── __tests__/App.test.tsx           # Legacy snapshot test — do not extend

.storybook/
├── main.ts                          # createMainConfig from hcc-storybook-hub; msw: true, a11y: false
├── preview.tsx                      # HccStorybookProvider + MemoryRouter + IntlMessagesProvider
└── mocks/
    ├── chrome.ts                    # Aliases @redhat-cloud-services/chrome
    └── scalprum.tsx                 # Aliases @scalprum/react-core (stubs the remote layout engine)

playwright/
├── constants.ts                     # TIMEOUTS — use these, never raw ms
├── pages/LandingPage.ts             # Page object: widget(), widgetMenuToggle(), gotoAndWaitForLayout()
└── e2e/                             # 7 specs — runs in Konflux PR pipeline against live stage

frontend.yml                         # Frontend CRD: widgetRegistry + baseWidgetLayouts (sm/md/lg/xl)
fec.config.js                        # moduleFederation.exposes — every widget needs an entry
eslint.config.js                     # Flat config; i18next/no-literal-string at error
vitest.config.ts                     # Two projects: 'unit' (happy-dom) and 'storybook' (browser)

cypress/                             # LEGACY — runs in no CI. Do not extend. See non-negotiable #11.
```
