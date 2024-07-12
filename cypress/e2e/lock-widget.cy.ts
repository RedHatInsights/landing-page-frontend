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
      .wait(5000);

    // hovertext "Move" sticks on the page, click somewhere else within the widget to make it go away
    // there's probably a better way to do this
    cy.get('[data-ouia-component-id="landing-rhel-widget"]')
      .contains('Red Hat Enterprise Linux')
      .click();

    cy.get('[aria-label="Move widget"]')
      .should('be.visible')
      .and('contain', 'Widget locked');

    // unlock widget
    cy.get('[data-ouia-component-id="landing-rhel-widget"]');
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="unlock-widget"]').first().click();
  });
});
