/* eslint-disable @typescript-eslint/no-require-imports */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
require('@4tw/cypress-drag-drop');
Cypress.Commands.add('login', () => {
  cy.session(
    `login-${Cypress.env('E2E_USER')}`,
    () => {
      cy.intercept({ url: '/apps/*', times: 1 }, {});
      cy.intercept({ url: '/api/', times: 4 }, {});
      // This JS file causes randomly an uncaught exception on login page which blocks the tests
      // Cannot read properties of undefined (reading 'setAttribute')
      cy.visit('/');
      // disable analytics integrations
      cy.setLocalStorage('chrome:analytics:disable', 'true');
      cy.setLocalStorage('chrome:segment:disable', 'true');

      cy.wait(1000);
      // login into the session
      try {
        cy.get('#username-verification').type(Cypress.env('E2E_USER'));
        cy.get('#login-show-step2').click();
        cy.get('#password').type(Cypress.env('E2E_PASSWORD'));
        cy.get('#rh-password-verification-submit-button').click();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        cy.get('#username').type(Cypress.env('E2E_USER'));
        cy.get('#password').type(Cypress.env('E2E_PASSWORD'));
        cy.get('#submit').click();
      }
    },
    { cacheAcrossSpecs: true },
  );
});

Cypress.Commands.add('resetToDefaultLayout', () => {
  cy.intercept(
    'POST',
    '**/api/chrome-service/v1/dashboard-templates/*/reset',
  ).as('resetLayout');
  cy.get('button')
    .contains('Reset to default')
    .click()
    .get("[data-ouia-component-id='WarningModal-confirm-checkbox']")
    .click()
    .get("button[data-ouia-component-id='WarningModal-confirm-button']")
    .click();
  cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('dragTotarget', (sourceSelector, targetSelector) => {
  const source = Cypress.$(sourceSelector);
  const target = Cypress.$(targetSelector);
  const { x, y } = target[0].getBoundingClientRect();

  cy.wrap(source)
    .trigger('mousedown', {
      which: 1,
      button: 0,
      eventConstructor: 'MouseEvent',
    })
    .trigger('pointerdown', { which: 1, button: 0 })
    .trigger('dragstart', { eventConstructor: 'DragEvent', ...source })
    .trigger('dragover', { eventConstructor: 'DragEvent', ...target })
    .trigger('mousemove', {
      clientX: x,
      clientY: y,
      eventConstructor: 'MouseEvent',
      ...target,
    })
    .trigger('drop', { eventConstructor: 'DragEvent', ...target })
    .trigger('mouseup', { which: 1, button: 0, force: true, ...target })
    .trigger('pointerup', { which: 1, button: 0, ...target });
});

Cypress.Commands.add('loadLandingPage', () => {
  cy.login();
  cy.visit('/');

  cy.intercept(
    'GET',
    '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage',
  ).as('loadLayout');
  cy.wait('@loadLayout').its('response.statusCode').should('eq', 200);

  cy.resetToDefaultLayout();
});

Cypress.Commands.add('removeWidget', (widgetId: string) => {
  cy.intercept('PATCH', '**/api/chrome-service/v1/dashboard-templates/*').as(
    'patchLayout',
  );

  cy.get(`[data-ouia-component-id="${widgetId}"]`).within(() => {
    cy.get('[aria-label="widget actions menu toggle"]').click();
  });
  cy.get('[data-ouia-component-id="remove-widget"]')
    .click()
    .wait('@patchLayout');
  cy.get(`[data-ouia-component-id="${widgetId}]`).should('not.exist');
});

Cypress.Commands.add(
  'addWidget',
  (widgetName: string, widgetTarget?: string) => {
    if (!widgetTarget) {
      widgetTarget = '[data-ouia-component-id="landing-rhel-widget"]';
    }

    // Click the add widget button so the addable widgets are displayed
    cy.get('[data-ouia-component-id="add-widget-button"]').click();

    cy.get(`[data-ouia-component-id="add-widget-card-${widgetName}"]`).drag(
      widgetTarget,
    );
  },
);
