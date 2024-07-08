describe('Dashboard with widgets is displayed', () => {
  // we don't need to reset the layout every time, just once at the start
  before(() => {
    cy.loadLandingPage();
    cy.intercept(
      'PATCH',
      '**/api/chrome-service/v1/dashboard-templates/NaN'
    ).log('PATCH NaN detected');
    // wait for everything to render before testing for presence of widgets
    cy.wait(5000);
  });

  it('should display dashboard with widgets', () => {
    const widgetIds = [
      'landing-rhel-widget',
      'landing-openshift-widget',
      'landing-ansible-widget',
      'landing-exploreCapabilities-widget',
      'landing-recentlyVisited-widget',
      'chrome-favoriteServices-widget',
      'landing-openshiftAi-widget',
      'landing-edge-widget',
      'landing-acs-widget',
    ];

    widgetIds.forEach((id) => {
      const widgetSelector = `[data-ouia-component-id="${id}"]`;
      cy.get(widgetSelector).scrollIntoView();
      cy.get(`[data-ouia-component-id="${id}"]`).should('exist');
    });
  });
});
