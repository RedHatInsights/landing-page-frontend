describe('Widgets autosize and minimize properly', () => {
  beforeEach(() => {
    cy.loadLandingPage();
  });

  afterEach(() => {
    cy.resetToDefaultLayout();
  });

  it('should autosize widget', () => {
    const widgetSelector = '.react-grid-item';
    cy.wait(2000);
    const initialHeight =
      Cypress.$(widgetSelector)[0].getBoundingClientRect().height;
    cy.wait(2000);
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="autosize-widget"]').first().click();
    cy.wait(2000).then(() => {
      const minimizedHeight =
        Cypress.$(widgetSelector)[0].getBoundingClientRect().height;
      expect(minimizedHeight).to.be.greaterThan(initialHeight);
    });
  });

  it('should minimize widget', () => {
    const widgetSelector = '.react-grid-item';
    cy.wait(2000);
    const initialHeight =
      Cypress.$(widgetSelector)[0].getBoundingClientRect().height;
    cy.wait(2000);
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="minimize-widget"]').first().click();
    cy.wait(2000).then(() => {
      const minimizedHeight =
        Cypress.$(widgetSelector)[0].getBoundingClientRect().height;
      expect(minimizedHeight).to.be.lessThan(initialHeight);
    });
  });
});
