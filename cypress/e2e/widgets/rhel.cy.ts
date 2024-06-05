describe('RHEL widget', () => {
  beforeEach(() => {
    cy.loadLandingPage();
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
    cy.get(
      `[data-ouia-component-id="landing-rhel-widget"] button.pf-v5-c-menu-toggle`
    ).click();
    cy.get(
      '[data-ouia-component-id="landing-rhel-widget"] [data-ouia-component-id="remove-widget"]'
    ).click();
    cy.get(`[data-ouia-component-id="landing-rhel-widget"]`).should(
      'not.exist'
    );
  });
});
