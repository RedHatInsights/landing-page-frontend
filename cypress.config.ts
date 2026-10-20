/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    blockHosts: ['consent.trustarc.com'],
    baseUrl: process.env.URL || 'https://stage.foo.redhat.com:1337',
    env: {
      E2E_USER: process.env.E2E_USER,
      E2E_PASSWORD: process.env.E2E_PASSWORD,
    },
    // To avoid any flaky issues we set the timeouts to be extra gracious
    // Slow tests are faster than rerunning flaky tests
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
    // required for the redirects to work correctly due to a chromium issue
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    screenshotOnRunFailure: false,
    // required for the SSO redirect
    chromeWebSecurity: false,
    video: false,
    setupNodeEvents(on, config) {
      require('cypress-localstorage-commands/plugin')(on, config);
      return config;
      // implement node event listeners here
    },
  },
});
