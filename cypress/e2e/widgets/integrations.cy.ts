describe('Integrations Widget', () => {
  const widgetId = 'sources-integrations-widget';

  beforeEach(() => {
    cy.viewport(1280, 2000);
    cy.intercept(
      'GET',
      '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage'
    ).as('resetLayout');

    cy.intercept('PATCH', '**/api/chrome-service/v1/dashboard-templates/*').as(
      'patchLayout'
    );
    cy.login();
    cy.visit('/');
    cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
  });


  it('does not appear in the default layout', () => {
    // Reset layout to the default
    cy.resetToDefaultLayout();

    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .should('not.exist');
    cy.resetToDefaultLayout();
  });

  it('disappears when removed from the layout', () => {
    cy.resetToDefaultLayout();
    // Add widget here
    cy.addWidget("Integrations");

    cy.removeWidget(widgetId);
    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .should('not.exist');
  });

/*
  it('can be added to the layout with proper permissions', () => {
      // stuff
  });

  it('allows the expansion of the various categories', () => {
      // stuff
  });

  it('can create an integration', () => {
      // stuff
  });
  */
});
