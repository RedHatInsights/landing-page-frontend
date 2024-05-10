import '@4tw/cypress-drag-drop';
import 'cypress-diff';

describe('Widget Layout', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    cy.viewport(1280, 2000);
    cy.get('.react-grid-item').should('be.visible');
  });

  const resetLayout = () => {
    cy.contains('Reset to default').click();
    cy.get('#warning-modal-check').click();
    cy.get('.pf-m-danger').contains('Reset layout').click();
    cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
  };

  const getLayout = () => {
    return cy
      .window()
      .then((win) => {
        const userString = win.localStorage.getItem(
          'oidc.user:https://sso.stage.redhat.com/auth/:cloud-services'
        );
        if (!userString) {
          throw new Error('User data not found in local storage.');
        }
        const user = JSON.parse(userString);
        return user['id_token'];
      })
      .then((token) => {
        return cy
          .request({
            url: `https://stage.foo.redhat.com:1337/api/chrome-service/v1/dashboard-templates?dashboard=landingPage`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false,
          })
          .then((response) => {
            if (response.body && response.body.data) {
              const defaultLayout = response.body.data.find(
                (layout) => layout.default === true
              );
              if (defaultLayout) {
                return defaultLayout.templateConfig;
              } else {
                throw new Error(
                  'Default layout not found in the response data.'
                );
              }
            } else {
              throw new Error('Response does not contain the "data" property.');
            }
          });
      });
  };

  const moveWidget = (sourceIndex: number, targetIndex: number) => {
    cy.get('.drag-handle')
      .eq(sourceIndex)
      .then((source) => {
        const targetSelector = `.drag-handle:eq(${targetIndex})`;
        cy.wrap(source).drag(targetSelector);
      });
    cy.wait('@patchLayout').its('response.statusCode').should('eq', 200);
  };

  it('can drag and drop widgets', () => {
    cy.intercept(
      'GET',
      '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage'
    ).as('resetLayout');
    cy.intercept('PATCH', '**/api/chrome-service/v1/dashboard-templates/*').as(
      'patchLayout'
    );

    resetLayout();
    moveWidget(0, 1);
    getLayout().then((firstMove) => {
      moveWidget(2, 1);
      getLayout().then((secondMove) => {
        expect(secondMove).to.not.deep.equal(firstMove);
      });
    });
    resetLayout();
  });
});
