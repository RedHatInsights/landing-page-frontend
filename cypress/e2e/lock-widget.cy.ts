describe('Widgets can lock and unlock', () => {
  beforeEach(() => {
    cy.loadLandingPage();
  });

  it('should lock widget, show that the ability to move is unavailable and return to menu to unlock widget', () => {
    // lock widget
    cy.get('[data-ouia-component-id="landing-rhel-widget"]');
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="lock-widget"]').first().click();

    // show that widget can't move
    cy.get('[data-ouia-component-id="landing-rhel-widget"] .drag-handle')
      .invoke('show')
      .trigger('mouseenter')
      .wait(1000);
    cy.get('[aria-label="Move widget"]')
      .should('be.visible')
      .and('contain', 'Widget locked');

    // unlock widget
    cy.get('[data-ouia-component-id="landing-rhel-widget"]');
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="unlock-widget"]').first().click();
  });
});
