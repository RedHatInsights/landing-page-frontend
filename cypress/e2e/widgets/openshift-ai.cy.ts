describe('Openshift AI widget', () => {
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

  it('should appear on default layout', () => {
    cy.get(`[data-ouia-component-id="landing-openshiftAi-widget"]`).should(
      'exist'
    );
  });

  it('should have correct link', () => {
    cy.get(`[data-ouia-component-id="landing-openshiftAi-widget"] a`)
      .should('have.attr', 'href')
      .and(
        'include',
        'https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai/trial'
      );
  });

  it('should be removed if clicked on remove', () => {
    cy.get(
      `[data-ouia-component-id="landing-openshiftAi-widget"] button.pf-v5-c-menu-toggle`
    ).click();
    cy.contains('.pf-v5-c-menu__item-text', 'Remove').click();
    cy.get(`[data-ouia-component-id="landing-openshiftAi-widget"]`).should(
      'not.exist'
    );
  });
});
