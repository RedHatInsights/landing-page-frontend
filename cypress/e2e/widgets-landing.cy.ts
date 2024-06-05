import 'cypress-real-events';

const moveWidget = async (sourceIndex: number, targetIndex: number) => {
  const sourceSelector = `.drag-handle:eq(${sourceIndex})`;
  const targetSelector = `.drag-handle:eq(${targetIndex})`;
  cy.dragTotarget(sourceSelector, targetSelector);
};

describe('Widget Landing Page', () => {
  beforeEach(() => {
    cy.loadLandingPage();
  });

  afterEach(() => {
    cy.resetToDefaultLayout();
  });

  it('closes all the widgets', () => {
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

    it.only('widgets can be resized', () => {
      cy.get('[tabindex="0"]')
        .find('[class="react-resizable-handle react-resizable-handle-ne"]')
        .realMouseDown()
        .realMouseMove(500, 0)
        .realMouseUp()
        .then(() => {
          cy.get('[tabindex="0"]')
            .invoke('attr', 'class')
            .then((classList) => {
              const classes = classList ? classList.split(' ') : [];
              expect('widget-columns-2').to.be.oneOf(classes);
            });
          cy.get('[tabindex="0"]')
            .invoke('width')
            .then((width) => {
              console.log(width);
              console.log(parseInt('@initialWidth'));
              expect(width).to.be.closeTo(894, 5);
            });
        });

      cy.wait('@patchLayout').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
      });

      cy.get('[tabindex="0"]')
        .find('[class="react-resizable-handle react-resizable-handle-ne"]')
        .realMouseDown()
        .realMouseMove(-500, 0)
        .realMouseUp();

      cy.wait('@patchLayout').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
      });

      cy.get('[tabindex="0"]')
        .invoke('width')
        .then((width) => {
          console.log(width);
          console.log(parseInt('@initialWidth'));
          expect(width).to.be.eq(403);
        });

      cy.resetToDefaultLayout();
    });
  });
});
