describe('RHEL widget', () => {
  beforeEach(() => {
    cy.loadLandingPage();
    cy.wait(5000);
  });

  it('should appear on default layout', () => {
    cy.get(`[data-ouia-component-id="landing-rhel-widget"]`).should('exist');
  });

  it('should have correct link', () => {
    cy.get(`[data-ouia-component-id="landing-rhel-widget"] a`)
      .should('have.attr', 'href')
      .and('include', `/preview/insights/`);
  });

  it('should be removed if clicked on remove', () => {
    const widgetId = 'landing-rhel-widget';
    cy.get(`[data-ouia-component-id="${widgetId}"]`).should('be.visible');
    cy.removeWidget(widgetId);
  });
});
