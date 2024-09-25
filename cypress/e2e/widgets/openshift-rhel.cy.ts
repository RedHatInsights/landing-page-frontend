describe('Red Hat OpenShift Widget', () => {
  const widgetId = 'landing-openshift-widget';

  beforeEach(() => {
    cy.login();
    cy.visit('/');

    cy.intercept(
      'GET',
      '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage'
    ).as('resetLayout');

    cy.intercept('PATCH', '**/api/chrome-service/v1/dashboard-templates/*').as(
      'patchLayout'
    );

    cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
  });

  it('appears in the default layout', () => {
    // Reset layout to the default
    cy.resetToDefaultLayout();

    const widgetId = 'landing-openshift-widget';
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('be.visible');
    cy.resetToDefaultLayout();

    // Confirm link takes user to RHOS Clusters page
    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .find('a')
      .should('have.attr', 'href')
      .and('include', '/openshift');
  });

  it('disappears when removed from the layout', () => {
    cy.resetToDefaultLayout();
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('be.visible');
    cy.removeWidget(widgetId);
    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .wait(1000)
      .should('be.visible');
  });
});
