describe('Ansible Automation Platform Widget', () => {
  const widgetID = 'landing-ansible-widget';
  const widgetLoc = `data-ouia-component-id="${widgetID}"`;

  beforeEach(() => {
    cy.loadLandingPage();
  });

  it('appears in the default layout', () => {
    // scroll into view for if the widget is lower on the page
    cy.get(`[${widgetLoc}]`).scrollIntoView().should('be.visible');
  });

  it('has the correct link', () => {
    cy.get(`[${widgetLoc}] a`)
      .should('have.attr', 'href')
      .and('include', '/ansible/ansible-dashboard');
  });

  it('is removed if the remove button is clicked', () => {
    cy.get(`[${widgetLoc}]`).scrollIntoView().should('be.visible');
    cy.removeWidget(widgetID);
    // cleanup
    cy.resetToDefaultLayout();
  });
});
