describe('Widgets can lock and unlock', () => {
  beforeEach(() => {
    cy.loadLandingPage();
    cy.viewport(1920, 1080);
  });

  it('should lock widget, show that the ability to move is unavailable and return to menu to unlock widget', () => {
    // lock widget
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="lock-widget"]').first().click().wait(2000);

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
    cy.get('[data-ouia-component-id="landing-rhel-widget"]');
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="unlock-widget"]').first().click();
  });
});
