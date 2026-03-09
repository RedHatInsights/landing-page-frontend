import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for landing-page-frontend E2E tests
 * Optimized for Konflux CI/CD pipeline execution
 */
export default defineConfig({
  // Test directory
  testDir: './playwright',

  // Timeout for each test (60 seconds)
  timeout: 60 * 1000,

  // Timeout for expect() assertions (10 seconds)
  expect: {
    timeout: 10 * 1000,
  },

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Number of workers - use 1 in CI to avoid resource contention
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html'],
    ['list'],
    ...(process.env.CI ? [['github']] : []),
  ],

  // Shared settings for all projects
  use: {
    // Base URL for tests
    // In Konflux, this will be overridden to point to the test environment (e.g., https://stage.foo.redhat.com:1337)
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://stage.foo.redhat.com:1337',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Video on first retry
    video: 'retain-on-failure',

    // Default navigation timeout
    navigationTimeout: 30 * 1000,

    // Action timeout
    actionTimeout: 10 * 1000,
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to add more browsers:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Run local dev server before starting tests (useful for local development)
  // Disable in CI by checking for CI environment variable
  webServer: process.env.CI ? undefined : {
    command: 'npm run start',
    url: 'http://localhost:8002',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
