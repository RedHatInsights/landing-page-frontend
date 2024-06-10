import '@4tw/cypress-drag-drop';

const moveWidget = (sourceIndex: number, targetIndex: number) => {
  cy.get('.drag-handle')
    .eq(sourceIndex)
    .then((source) => {
      const targetSelector = `.drag-handle:eq(${targetIndex})`;
      cy.wrap(source).drag(targetSelector);
    });
};

describe('Widgets can lock and unlock', () => {
  beforeEach(() => {
    cy.loadLandingPage();
  });

  it('should lock widget', () => {
    cy.wait(2000);
    cy.get('[aria-label="widget actions menu toggle"]').first().click();
    cy.get('[data-ouia-component-id="lock-widget"]').first().click();
  });

  it('widgets can be dragged and dropped', () => {
    moveWidget(0, 1);

    cy.wait('@patchLayout').then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      const firstMove = response?.body?.data;
      expect(firstMove).to.be.null;
    });

    it('should unlock widget', () => {
      const widgetSelector = '.react-grid-item';
      cy.wait(2000);
      const initialHeight =
        Cypress.$(widgetSelector)[0].getBoundingClientRect().height;
      cy.wait(2000);
      cy.get('[aria-label="widget actions menu toggle"]').first().click();
      cy.get('[data-ouia-component-id="unlock-widget"]').first().click();
      cy.wait(2000).then(() => {
        const minimizedHeight =
          Cypress.$(widgetSelector)[0].getBoundingClientRect().height;
        expect(minimizedHeight).to.be.lessThan(initialHeight);
      });
    });
  });
});
