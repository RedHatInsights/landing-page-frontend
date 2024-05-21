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
    });

    it('widgets can be dragged and dropped', () => {
      moveWidget(0, 1);

      cy.wait('@patchLayout').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
        const firstMove = response?.body?.data;
        expect(firstMove).to.not.be.null;

        moveWidget(2, 1);

        cy.wait('@patchLayout').then(({ response }) => {
          expect(response?.statusCode).to.eq(200);
          const secondMove = response?.body?.data;
          expect(secondMove).to.not.be.null;
          expect(secondMove).to.not.deep.equal(firstMove);
        });
      });

      resetToDefaultLayout();
      cy.wait('@resetLayout').its('response.statusCode').should('eq', 200);
    });
  });
});
