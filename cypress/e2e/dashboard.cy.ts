describe('Dashboard with widgets is displayed', () => {
  beforeEach(() => {
    cy.loadLandingPage();
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
      cy.get(`[data-ouia-component-id="${id}"]`).should('exist');
    });
  });
});
