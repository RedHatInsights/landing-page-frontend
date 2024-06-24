const moveWidget = async (sourceIndex: number, targetIndex: number) => {
  const sourceSelector = `.drag-handle:eq(${sourceIndex})`;
  const targetSelector = `.drag-handle:eq(${targetIndex})`;

  cy.get(sourceSelector, { timeout: 5000 })
    .should('be.visible')
    .then(($source) => {
      cy.get(targetSelector, { timeout: 5000 })
        .should('be.visible')
        .then(($target) => {
          cy.wrap($source).trigger('mousedown', { which: 1 });

          cy.wrap($target)
            .trigger('mousemove', { which: 1 })
            .trigger('mouseup', { force: true });
        });
    });
};

describe('Widget Landing Page', () => {
  beforeEach(() => {
    cy.loadLandingPage();
  });

  afterEach(() => {
    cy.resetToDefaultLayout();
  });

  // Test skipped until issue with NaN on PATCH is resolved (makes test flaky)
  xit('closes all the widgets', () => {
    // Ensure that widgets are open and displayed (Number of items in grid expected to be numDefaultWidgets)
    const numDefaultWidgets = 9;
    const cardActionsSelector = '[aria-label="widget actions menu toggle"]';
    cy.get(cardActionsSelector)
      .its('length')
      .should('be.eq', numDefaultWidgets);

    // Close all the widgets
    cy.get(cardActionsSelector).each(($card) => {
      cy.wrap($card)
        .click()
        .get('[data-ouia-component-id="remove-widget"]')
        .click()
        .wait(5000);
      cy.wrap($card).should('not.exist');
    });

    // no cards should be present
    cy.get(cardActionsSelector).should('not.exist');

    // Confirm that the "empty" message is displayed
    cy.get('[id="widget-layout-container"]')
      .find('h2')
      .contains('No dashboard content');
  });

  describe('Widget Layout', () => {
    beforeEach(() => {
      cy.loadLandingPage();
      cy.viewport(1280, 2000);
      cy.get('.react-grid-item').should('be.visible');
    });

    afterEach(() => {
      cy.resetToDefaultLayout();
    });

    it('widgets can be dragged and dropped', () => {
      //TODO: front-end sometimes sends Nan - to be fixed
      cy.intercept(
        'PATCH',
        '**/api/chrome-service/v1/dashboard-templates/NaN',
        {}
      );
      cy.intercept(
        'PATCH',
        '**/api/chrome-service/v1/dashboard-templates/*'
      ).as('patchLayout');
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
    });
  });
});
