import '@4tw/cypress-drag-drop';

function resetToDefaultLayout() {
  cy.get('button')
    .contains('Reset to default')
    .click()
    .get('#warning-modal-check')
    .click()
    .get("button[data-ouia-component-id='primary-confirm-button']")
    .click();
}

const getLayout = () => {
  return cy
    .getCookie('cs_jwt')
    .should('exist')
    .then((token) => {
      if (!token || !token.value) {
        throw new Error('JWT cookie not found.');
      }
      return cy
        .request({
          url: 'https://stage.foo.redhat.com:1337/api/chrome-service/v1/dashboard-templates?dashboard=landingPage',
          headers: {
            Authorization: `Bearer ${token.value}`,
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
              throw new Error('Default layout not found in the response data.');
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
};

describe('Widget Landing Page', () => {
  it('closes all the widgets', () => {
    cy.login();
    cy.visit('/');

    // Reset layout to the default
    resetToDefaultLayout();

    // Ensure that widgets are open and displayed (Number of items in grid expected to be numDefaultWidgets)
    const numDefaultWidgets = 9;
    cy.get(
      '.widgetLayout > section > div > .react-grid-layout > .react-grid-item'
    )
      .its('length')
      .should('be.eq', numDefaultWidgets)
      .wait(1500);

    const cardActionsSelector =
      '.widgetLayout > section > div > .react-grid-layout > .react-grid-item > div > .pf-v5-c-card__header > .pf-v5-c-card__actions > div > button';

    // Close all the widgets
    for (let i = 0; i < numDefaultWidgets; i++) {
      cy.get(cardActionsSelector)
        .first()
        .click()
        .get('body > div.pf-v5-c-menu > div > ul > li:nth-child(4) > button')
        .click()
        .wait(1500);
    }

    // Confirm that the "empty" message is displayed
    cy.get('h2').contains('No dashboard content');

    // Reset to default layout
    resetToDefaultLayout();
  });

  describe('Widget Layout', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('/');
      cy.viewport(1280, 2000);
      cy.get('.react-grid-item').should('be.visible');
    });

    it('widgets can be dragged and dropped', () => {
      cy.intercept(
        'GET',
        '**/api/chrome-service/v1/dashboard-templates?dashboard=landingPage'
      ).as('resetLayout');
      cy.intercept(
        'PATCH',
        '**/api/chrome-service/v1/dashboard-templates/*'
      ).as('patchLayout');

      resetToDefaultLayout();
      cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
      moveWidget(0, 1);
      cy.wait('@patchLayout').its('response.statusCode').should('eq', 200);
      getLayout().then((firstMove) => {
        moveWidget(2, 1);
        cy.wait('@patchLayout').its('response.statusCode').should('eq', 200);
        getLayout().then((secondMove) => {
          expect(secondMove).to.not.deep.equal(firstMove);
        });
      });
      resetToDefaultLayout();
      cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
    });
  });
});
