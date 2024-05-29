describe('RHEL widget', () => {
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

    cy.resetToDefaultLayout();
    cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
  });

  it.skip('should appear on default layout', () => {
    cy.get(`[data-ouia-component-id="landing-rhel-widget"]`).should('exist');
  });

  it.skip('should have correct link', () => {
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
    cy.wait('@patchLayout').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      expect(response?.body?.data).to.not.be.null;

      cy.get(`[data-ouia-component-id="landing-rhel-widget"]`).should(
        'not.be.visible'
      );
    });
  });
});
