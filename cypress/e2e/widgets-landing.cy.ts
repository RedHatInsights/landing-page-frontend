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

  // Test skipped until issue with NaN on PATCH is resolved (makes test flaky)
  // Related JIRA issue: https://issues.redhat.com/browse/RHCLOUD-33743
  it('closes all the widgets', () => {
    const cardActionsSelector = '[aria-label="widget actions menu toggle"]';

    const removeWidgets = () => {
      cy.get(cardActionsSelector).each(($card) => {
        cy.wrap($card).scrollIntoView().click();

        cy.get('[data-ouia-component-id="remove-widget"]')
          .scrollIntoView()
          .click()
          .wait(1000);
        cy.wrap($card).should('not.exist');
      });
    };

    // first attempt
    removeWidgets();

    // check if any widgets are left and try again to avoid crash
    cy.get('body').then(($body) => {
      if ($body.find(cardActionsSelector).length > 0) {
        cy.log('Retrying to remove remaining widgets');
        removeWidgets();
      }
    });

    // Confirm that the "empty" message is displayed
    cy.get('[id="widget-layout-container"]')
      .find('h2')
      .contains('No dashboard content');
  });

  describe('Widget Layout', () => {
    beforeEach(() => {
      cy.loadLandingPage();
      cy.wait(4000);
      cy.viewport(1280, 2000);
      cy.get('.react-grid-item').should('be.visible');

      //TODO: front-end sometimes sends Nan - to be fixed
      cy.intercept(
        'PATCH',
        '**/api/chrome-service/v1/dashboard-templates/NaN',
        {},
      );
      cy.intercept(
        'PATCH',
        '**/api/chrome-service/v1/dashboard-templates/*',
      ).as('patchLayout');
    });

    afterEach(() => {
      cy.resetToDefaultLayout();
    });

    it('widgets can be dragged and dropped', () => {
      moveWidget(0, 1);

      cy.wait('@patchLayout').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
        const firstMove = response?.body?.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(firstMove).to.not.be.null;

        moveWidget(2, 1);

        cy.wait('@patchLayout').then(({ response }) => {
          expect(response?.statusCode).to.eq(200);
          const secondMove = response?.body?.data;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          expect(secondMove).to.not.be.null;
          expect(secondMove).to.not.deep.equal(firstMove);
        });
      });
    });

    it('widgets can be resized', () => {
      cy.wait(4000);
      cy.get('[tabindex="0"]')
        .invoke('width')
        .then((width) => {
          expect(width).to.be.closeTo(398, 20);
        });
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
              expect(width).to.be.closeTo(894, 20);
            });
        });

      cy.wait('@patchLayout').then(({ response }) => {
        expect(response?.statusCode).to.eq(200);
      });
    });
  });
});
