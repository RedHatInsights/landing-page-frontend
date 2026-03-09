# E2E Test Coverage for landing-page-frontend

This document outlines all Playwright E2E tests for the landing-page-frontend application, their purpose, and execution strategy.

## Overview

All UI-related tests have been migrated to the Playwright framework. The test suite consists of **9 test spec files** covering approximately **820 lines** of test code.

## Test Execution Strategy

### In-Pipeline Tests (Target: < 5 minutes)

Tests that will run on every pull request in the Konflux pipeline:

#### 1. Authentication Tests
**File**: `playwright/e2e/login.spec.ts`
- **Purpose**: Verify SSO authentication flow
- **Test Count**: 1 test
- **Coverage**:
  - User can login via RH SSO
  - Authenticated user reaches the app
  - User avatar is visible after login
  - No redirect to sso.redhat.com after authentication
- **Estimated Duration**: 5-10 seconds
- **In-Pipeline**: YES

#### 2. Session Initialization Tests
**File**: `playwright/e2e/session-init.spec.ts`
- **Purpose**: Verify user session is properly initialized
- **Test Count**: 1 test
- **Coverage**:
  - User session initialized via storageState
  - User avatar visible after session init
- **Estimated Duration**: 5 seconds
- **In-Pipeline**: YES

#### 3. Landing Page Smoke Tests
**File**: `playwright/e2e/landing-smoke.spec.ts`
- **Purpose**: Critical smoke tests for core landing page functionality
- **Test Count**: 2 tests
- **Coverage**:
  - Landing page loads successfully
  - "My favorite services" section is visible
  - Default widget containers are present:
    - landing-rhel-widget
    - landing-openshift-widget
    - landing-ansible-widget
    - landing-exploreCapabilities-widget
    - landing-recentlyVisited-widget
    - chrome-favoriteServices-widget
    - landing-openshiftAi-widget
    - landing-imageBuilder-widget
    - landing-acs-widget
- **Estimated Duration**: 15-20 seconds
- **In-Pipeline**: YES

#### 4. Widget Basic Tests
**File**: `playwright/e2e/widgets-basic.spec.ts`
- **Purpose**: Verify basic widget presence, links, and removal functionality
- **Test Count**: 11 tests
- **Coverage**:
  - RHEL widget: existence, link validation, removal
  - Ansible widget: presence, link to `/ansible/ansible-dashboard`, removal
  - OpenShift widget: existence, link to `/openshift`, removal
  - OpenShift AI widget: presence, external link validation, removal
  - ACS widget: descriptive copy validation
- **Estimated Duration**: 45-60 seconds
- **In-Pipeline**: YES

#### 5. Chrome Tooltips Tests
**File**: `playwright/e2e/chrome-tooltips.spec.ts`
- **Purpose**: Verify chrome-level UI elements (Settings/Help tooltips)
- **Test Count**: 1 test
- **Coverage**:
  - Settings button tooltip appears on hover
  - Help button tooltip appears on hover with correct content
- **Estimated Duration**: 10 seconds
- **In-Pipeline**: YES
- **Note**: Tests chrome-level elements, included in migration plan

### Nightly Scheduled Tests (Longer-Running)

Tests that should run nightly against the stage environment via app-interface:

#### 6. Widget Layout Operations
**File**: `playwright/e2e/widgets-layout.spec.ts`
- **Purpose**: Comprehensive widget layout manipulation tests
- **Test Count**: 15+ tests (includes complex drag-and-drop operations)
- **Coverage**:
  - Widget drag and drop reordering
  - Widget locking/unlocking
  - Widget removal and restoration
  - Layout persistence
  - Responsive layout behavior
  - Chrome overlay handling
- **Estimated Duration**: 2-3 minutes
- **In-Pipeline**: NO (scheduled nightly)
- **Reason**: Complex interactions, longer execution time

#### 7. Favorite Services Widget
**File**: `playwright/e2e/favorite-services-widget.spec.ts`
- **Purpose**: Test favoriting/unfavoriting services in the chrome widget
- **Test Count**: 8+ tests
- **Coverage**:
  - Opening services menu
  - Adding services to favorites
  - Removing services from favorites
  - Category navigation (Automation, etc.)
  - Widget state persistence
- **Estimated Duration**: 1-2 minutes
- **In-Pipeline**: NO (scheduled nightly)
- **Reason**: Complex chrome interactions, multiple async operations

#### 8. Integrations Widget
**File**: `playwright/e2e/integrations-widget.spec.ts`
- **Purpose**: Test integrations widget functionality
- **Test Count**: 4 tests
- **Coverage**:
  - Widget not in default layout
  - Adding/removing widget from layout
  - Expanding integration categories
  - Creating new integration (wizard flow)
- **Estimated Duration**: 45-60 seconds
- **In-Pipeline**: NO (scheduled nightly)
- **Reason**: Depends on external integrations service

#### 9. Explore Capabilities Widget
**File**: `playwright/e2e/explore-capabilities.spec.ts`
- **Purpose**: Validate Explore Capabilities widget content and CTAs
- **Test Count**: 1 test (validates 5 tiles)
- **Coverage**:
  - "Get started with a tour" tile and link
  - "Try OpenShift on AWS" (ROSA) tile and link
  - "Developer Sandbox" tile and external link
  - "Analyze RHEL environments" tile and link
  - "Convert from CentOS to RHEL" tile and link
- **Estimated Duration**: 30-45 seconds
- **In-Pipeline**: MAYBE (borderline - monitor execution time)
- **Timeout**: 90 seconds configured

## Test Categories Summary

### By Category
- **Authentication**: 2 tests
- **Smoke Tests**: 2 tests
- **Widget Functionality**: 11 tests
- **Widget Layout**: 15+ tests
- **Chrome Integration**: 8+ tests
- **External Integrations**: 4 tests
- **Navigation/CTAs**: 1 test (5 validations)

### By Execution Location
- **In-Pipeline (PR)**: ~18 tests (estimated < 2.5 minutes total)
- **Nightly Scheduled**: ~28 tests (estimated 4-6 minutes total)

## Test Infrastructure

### Authentication
- **Method**: Global setup with `storageState`
- **File**: `playwright/global-setup.ts`
- **Flow**: Login performed once, session saved to `playwright/.auth/user.json`
- **Credentials**: Sourced from Vault via `landing-page-frontend-credentials-secret`

### Page Objects
- **LandingPage**: `playwright/pages/LandingPage.ts`
  - Provides helper methods for common operations
  - Widget selectors and interactions
  - Layout reset functionality
  - Navigation and waiting utilities

### Test Configuration
- **Config File**: `playwright.config.ts`
- **Base URL**: `https://stage.foo.redhat.com:1337`
- **Browser**: Chromium (primary), Firefox/WebKit (commented out)
- **Parallelization**: Disabled on CI (workers: 1)
- **Retries**: 2 on CI, 0 locally
- **Reporter**: HTML

## Nightly Test Configuration (app-interface)

The nightly scheduled tests should be configured in app-interface with the following parameters:

### Test Selection
Run only the nightly test suite:
```bash
npx playwright test \
  playwright/e2e/widgets-layout.spec.ts \
  playwright/e2e/favorite-services-widget.spec.ts \
  playwright/e2e/integrations-widget.spec.ts \
  playwright/e2e/explore-capabilities.spec.ts
```

### Environment
- **Target**: Stage environment (`https://stage.foo.redhat.com:1337`)
- **Frequency**: Nightly
- **Reporting**: Results sent to Ibutsu

### Credentials
- Use the same Vault credentials as in-pipeline tests
- Ensure E2E_USER and E2E_PASSWORD environment variables are set

## Test Maintenance

### Adding New Tests
1. Create spec file in `playwright/e2e/`
2. Import Page Objects as needed
3. Follow existing patterns for authentication and setup
4. Document in this file
5. Categorize as in-pipeline or nightly based on execution time

### Monitoring Execution Time
- In-pipeline tests MUST complete in < 5 minutes total
- If in-pipeline suite exceeds 5 minutes, move longest tests to nightly
- Monitor Konflux pipeline runs for timing data

### Test Failure Investigation
1. Check Playwright HTML report
2. Review traces (enabled on first retry)
3. Check Konflux pipeline logs for environment issues
4. Verify credentials are valid
5. Check for stage environment outages

## Migration Notes

All tests have been migrated from the previous Cypress framework to Playwright:
- Cypress component tests → Playwright E2E tests
- Cypress E2E tests → Playwright E2E tests
- Authentication flow updated to use Playwright global setup
- Page Object pattern maintained for consistency

## Success Criteria

- All in-pipeline tests pass on every PR
- Total in-pipeline execution time < 5 minutes
- Nightly tests run successfully against stage
- Test failures reported to Ibutsu
- No test flakiness (retries should rarely be needed)

## Links

- Playwright Documentation: https://playwright.dev/
- Playwright Config: `/playwright.config.ts`
- Global Setup: `/playwright/global-setup.ts`
- Page Objects: `/playwright/pages/`
- Test Files: `/playwright/e2e/`
