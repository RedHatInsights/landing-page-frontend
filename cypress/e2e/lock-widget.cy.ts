describe('Widgets can lock and unlock', () => {
  const menuToggleLocator =
    '[data-ouia-component-id="landing-rhel-widget"] [aria-label="widget actions menu toggle"]';

  const lockWidgetLocator = '[data-ouia-component-id="lock-widget"] > button';
  const unlockWidgetLocator =
    '[data-ouia-component-id="unlock-widget"] > button';

  beforeEach(() => {
    cy.loadLandingPage();
    cy.viewport(1920, 1080);
    cy.intercept('PATCH', '**/api/chrome-service/v1/dashboard-templates/*').as(
      'patchLayout'
    );
    // waits until page content has rendered before proceeding
    cy.get('[id="widget-layout-container"] .react-grid-item')
      .contains(
        'Proactively assess, secure, and stabilize the business-critical services that you scale from your RHEL systems.'
      )
      .should('be.visible');
    // test started passing consistently once I added this wait. Weird.
    cy.wait(5000);
  });

  it('should lock widget, show that the ability to move is unavailable and return to menu to unlock widget', () => {
    // click the lock button in the toggle menu
    cy.get(menuToggleLocator)
      .click()
      .get(lockWidgetLocator)
      .should('be.visible')
      .click()
      .get(lockWidgetLocator)
      .should('not.exist')
      .wait('@patchLayout');

    // reopen the menu and confirm the menu changed to say "unlock"
    cy.get(menuToggleLocator)
      .should('be.visible')
      .click()
      .get(unlockWidgetLocator)
      .should('be.visible')
      .get(menuToggleLocator)
      .click();

    // try moving the widget
    const dragHandleLocator =
      '[data-ouia-component-id="landing-rhel-widget"] .drag-handle';

    const destLocator = '[data-ouia-component-id="landing-openshift-widget"]';
    cy.dragTotarget(dragHandleLocator, destLocator);

    // indirectly check if the widget moved (should still be the first in the list of cards)
    cy.get('[id="widget-layout-container"] .react-grid-item')
      .first()
      .contains('Red Hat Enterprise Linux');

    // unlock widget
    cy.get(menuToggleLocator)
      .click()
      .get('[data-ouia-component-id="unlock-widget"]')
      .first()
      .click();
  });
});
