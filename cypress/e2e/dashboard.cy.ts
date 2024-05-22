describe('Dashboard with widgets is displayed', () => {
  beforeEach(() => {
    cy.login();
  });
  it('should display dashboard with widgets', () => {
    cy.visit('/');
    cy.wait(4000);

    // Reset layout to the default
    cy.resetToDefaultLayout();

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
