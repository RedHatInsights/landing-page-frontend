describe('Widgets autosize and minimize properly', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    cy.intercept(
      'GET',
      '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage'
    ).as('resetLayout');
    cy.resetToDefaultLayout();
    cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
  });

  it('should autosize widget', () => {
    const widgetSelector = '.widgetLayout [tabindex="0"]';
    cy.getElementHeight(widgetSelector).then((initialHeight) => {
      cy.get('[aria-label="widget actions menu toggle"]').first().click();
      cy.get('[data-ouia-component-id="autosize-widget"]').first().click();

      cy.getElementHeight(widgetSelector).should(
        'be.greaterThan',
        initialHeight
      );
    });
  });

  it('should minimize widget', () => {
    const widgetSelector = '.widgetLayout [tabindex="0"]';
    cy.getElementHeight(widgetSelector).then((initialHeight) => {
      cy.get('[aria-label="widget actions menu toggle"]').first().click();
      cy.get('[data-ouia-component-id="minimize-widget"]').first().click();

      cy.getElementHeight(widgetSelector).should('be.lessThan', initialHeight);
    });
  });
});
