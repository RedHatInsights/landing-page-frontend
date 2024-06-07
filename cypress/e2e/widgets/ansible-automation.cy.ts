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
    cy.get(`[${widgetLoc}]`).within(() => {
      cy.get('[aria-label="widget actions menu toggle"]').click();
      cy.get('[data-ouia-component-id="remove-widget"]').click();
    });
    cy.get(`[${widgetLoc}]`).should('not.exist');

    // cleanup
    cy.resetToDefaultLayout();
  });
});
