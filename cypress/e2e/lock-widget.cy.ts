describe('Widgets can lock and unlock', () => {
  beforeEach(() => {
    cy.loadLandingPage();
  });

  it('should lock widget, show that the ability to move is unavailable and return to menu to unlock widget', () => {
    // lock widget
    cy.get('[data-ouia-component-id="landing-rhel-widget"]');
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="lock-widget"]').first().click();

    // show that widget is locked
    cy.get('[aria-label="move widget"]').trigger('mouseover');
    cy.contains('Widget locked').should('be.visible');

    // unlock widget
    cy.get('[data-ouia-component-id="landing-rhel-widget"]');
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="unlock-widget"]').first().click();
  });
});
