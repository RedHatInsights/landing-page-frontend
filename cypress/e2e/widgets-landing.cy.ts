function resetToDefaultLayout() {
  cy.get('button')
    .contains('Reset to default')
    .click()
    .get('#warning-modal-check')
    .click()
    .get("button[data-ouia-component-id='primary-confirm-button']")
    .click();
}

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
});
