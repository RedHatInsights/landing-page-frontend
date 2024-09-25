interface FavoritePage {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  pathname: string;
  favorite: boolean;
  userIdentityId: number;
}

describe('My Favorite Services Widget', () => {
  const widgetId = 'chrome-favoriteServices-widget';

  beforeEach(() => {
    cy.viewport(1280, 2000);
    cy.intercept(
      'GET',
      '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage'
    ).as('resetLayout');

    cy.intercept('PATCH', '**/api/chrome-service/v1/dashboard-templates/*').as(
      'patchLayout'
    );
    replaceFavorites([]);

    cy.login();
    cy.visit('/');

    cy.intercept('GET', '**/api/chrome-service/v1/user').as('getFavorites');

    cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
  });

  const replaceFavorites = (favorites: FavoritePage[]) => {
    cy.intercept('GET', '**/api/chrome-service/v1/user', (req) => {
      req.continue((res) => {
        const body = JSON.parse(res.body);
        body.data.favoritePages = favorites;
        res.body = JSON.stringify(body);
      });
    }).as('getFavorites');
  };

  it('appears in the default layout', () => {
    // Reset layout to the default
    cy.resetToDefaultLayout();

    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .scrollIntoView()
      .should('be.visible');
    cy.resetToDefaultLayout();
  });

  it('disappears when removed from the layout', () => {
    cy.resetToDefaultLayout();
    cy.removeWidget(widgetId);
    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .wait(1000)
      .scrollIntoView()
      .should('not.be.visible');
  });

  it('displays the empty state when no favorites are set', () => {
    cy.resetToDefaultLayout();
    cy.wait('@getFavorites');

    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('h3').should('contain', 'No favorited services');
      });
  });

  it('displays the favorites when they are set', () => {
    const testFavorites: FavoritePage[] = [
      {
        id: 665,
        createdAt: '2024-08-02T19:52:52.29345Z',
        updatedAt: '2024-08-02T19:52:52.29345Z',
        deletedAt: null,
        pathname: '/settings/notifications',
        favorite: true,
        userIdentityId: 1,
      },
      {
        id: 664,
        createdAt: '2024-08-02T19:52:51.305442Z',
        updatedAt: '2024-08-02T19:52:51.305442Z',
        deletedAt: null,
        pathname: '/settings/integrations',
        favorite: true,
        userIdentityId: 1,
      },
    ];

    replaceFavorites(testFavorites);
    cy.visit('/');
    cy.resetToDefaultLayout();
    cy.wait('@getFavorites');

    cy.get(`[data-ouia-component-id="${widgetId}"]`)
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.get('p').should('contain', 'Notifications');
        cy.get('p').should('contain', 'Integrations');
      });
  });
});
