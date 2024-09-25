describe('Openshift AI widget', () => {
  beforeEach(() => {
    cy.viewport(1280, 2000);
    cy.loadLandingPage();
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
    const widgetId = 'landing-openshiftAi-widget';
    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .scrollIntoView()
      .should('be.visible');
    cy.removeWidget('landing-openshiftAi-widget');
    cy.get(`[data-ouia-component-id="${widgetId}"]`);
    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .wait(1000)
      .scrollIntoView()
      .should('not.be.visible');
  });
});
