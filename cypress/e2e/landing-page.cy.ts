// Landing page has changed
describe('Landing page', () => {
  it('visit landing page', () => {
    cy.login();

    cy.visit('/');
    cy.wait(4000);

    // check if a favorites link exists on the page
    cy.contains('My favorite services').should('exist');
  });

  it.skip('tooltip is shown when hovering over the gear/question icon', () => {
    cy.login();

    cy.visit('/');
    cy.wait(4000);
    // This is not landing page element but chrome element. Landing page should ne testing for this.
    cy.get('.tooltip-button-settings-cy')
      .invoke('show')
      .trigger('mouseenter')
      .wait(1000);
    cy.get('.tooltip-inner-settings-cy')
      .should('be.visible')
      .and('contain', 'Settings');

    cy.get('.tooltip-button-help-cy')
      .invoke('show')
      .trigger('mouseenter')
      .wait(1000);
    cy.get('.tooltip-inner-help-cy')
      .should('be.visible')
      .and('contain', 'Help');
  });
});
