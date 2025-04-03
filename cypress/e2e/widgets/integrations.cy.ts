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
    // Check to see if the widget is not on the page
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('not.exist');
    cy.resetToDefaultLayout();
  });

  it('can be added and removed from the layout', () => {
    // Reset layout to the default
    cy.resetToDefaultLayout();
    // Add widget
    cy.addWidget('Integrations');
    // Check to see if widget is on the page
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('exist');
    // Remove the widget
    cy.removeWidget(widgetId);
    // Check to see if the widget is not on the page
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('not.exist');
  });
  it('allows the expansion of the various categories', () => {
    cy.resetToDefaultLayout();
    // Add widget here
    cy.addWidget('Integrations');
    // Check to see if widget is on the page
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('exist');
    // Count the hidden body elements
    cy.get(`[data-ouia-component-id="${widgetId}"] div[hidden]`).should(
      'have.length.greaterThan',
      0
    );
    // Expand the categories
    cy.get(
      `[data-ouia-component-id="${widgetId}"] [id^="expandable-section-toggle"][aria-expanded="false"]`
    ).each(($el) => {
      $el.click();
    });
    // Count the hidden body elements
    cy.get(`[data-ouia-component-id="${widgetId}"] div[hidden]`).should(
      'have.length',
      0
    );
    // Remove the widget
    cy.removeWidget(widgetId);
  });

  it('can create an integration', () => {
    cy.resetToDefaultLayout();
    // Add widget here
    cy.addWidget('Integrations');
    // Check to see if widget is on the page
    cy.get(`[data-ouia-component-id="${widgetId}"]`).within(() => {
      cy.get('button').contains('Create Integration').click();
    });
    // Integration dropdown should be open now so select one
    cy.get(`[data-ouia-component-id="${widgetId}"]`).within(() => {
      cy.get('div[class="pf-v5-c-menu"]').within(() => {
        cy.get('span[class="pf-v5-c-menu__item-text"]')
          .contains('Red Hat')
          .click();
      });
    });
    // Integration wizard should be open now. Verify it exists and stop
    cy.get('h2').contains('Add Red Hat integration').should('exist');
    cy.get('div[name="wizard"] button[aria-label="Close wizard"]').click();
  });
});
