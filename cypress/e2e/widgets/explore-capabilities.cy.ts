describe('Explore Capabilities widget', () => {
  const capabilitiesWidgetSelector = `[data-ouia-component-id="landing-exploreCapabilities-widget"]`;

  before(() => {
    cy.viewport(1920, 1500);
    cy.loadLandingPage();
    // wait for the last widget in the sequence to load and render
    cy.get(capabilitiesWidgetSelector).scrollIntoView().should('be.visible');
  });

  const widgetTestData = [
    {
      tabHeading: 'Get started with the Hybrid Cloud Console',
      contentHeader: 'Take a tour of the Console',
      buttonText: 'Start the guided tour',
      // pendo pop-ups appear to be non-testable with cypress
      expectedLinkDest: null,
    },
    {
      tabHeading: 'Try OpenShift with AWS',
      contentHeader: 'Get started with Red Hat OpenShift Service on AWS (ROSA)',
      buttonText: 'Try ROSA',
      expectedLinkDest: null,
    },
    {
      tabHeading: 'Develop on the OpenShift Sandbox',
      contentHeader:
        'Develop in the sandbox with the Red Hat Developer program',
      buttonText: 'Explore the sandbox',
      expectedLinkDest: 'https://sandbox.redhat.com',
    },
    {
      tabHeading: 'Analyze your environments',
      contentHeader: 'Continuously analyze with Red Hat Insights',
      buttonText: 'Identify and resolve risks',
      expectedLinkDest: '/insights/dashboard',
    },
    {
      tabHeading: 'Connect to your subscriptions',
      contentHeader: 'Empower your buying decisions with data',
      buttonText: 'Explore subscriptions',
      expectedLinkDest: '/subscriptions/inventory',
    },
    {
      tabHeading: 'Convert your CentOS systems to RHEL',
      contentHeader: 'Convert your CentOS systems to Red Hat Enterprise Linux',
      buttonText: 'Run a pre-conversion analysis',
      expectedLinkDest: '/insights/tasks/available/convert-to-rhel-analysis',
    },
    {
      tabHeading: 'Configure your console',
      contentHeader: 'Customize your notification settings',
      buttonText: 'Configure settings',
      expectedLinkDest: '/settings/notifications',
    },
  ];

  it('should display the appropriate content and links for each tab', () => {
    // the tab entry should be present
    widgetTestData.forEach((widgetDataItem) => {
      // base widget is visible
      cy.get(capabilitiesWidgetSelector)
        .scrollIntoView()
        .should('be.visible')
        .click();

      // confirm content header is displayed properly
      cy.get(capabilitiesWidgetSelector)
        .scrollIntoView()
        .contains(widgetDataItem.tabHeading)
        .should('be.visible')
        .click();

      cy.get(capabilitiesWidgetSelector)
        .scrollIntoView()
        .contains(widgetDataItem.contentHeader)
        .should('be.visible');

      cy.get('a')
        .contains(widgetDataItem.buttonText)
        .as('buttonLink')
        .should('be.visible');
      if (widgetDataItem.expectedLinkDest == null) {
        return;
      }
      cy.get('@buttonLink')
        .click()
        .url()
        .should('include', widgetDataItem.expectedLinkDest)
        .go('back');
    });
  });
});
