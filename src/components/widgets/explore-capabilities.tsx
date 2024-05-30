import React from 'react';
import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import {
  Card,
  CardBody,
} from '@patternfly/react-core/dist/dynamic/components/Card';
import { Drawer } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerContent } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerContentBody } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerPanelBody } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerPanelContent } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { SimpleList } from '@patternfly/react-core/dist/dynamic/components/SimpleList';
import { SimpleListItem } from '@patternfly/react-core/dist/dynamic/components/SimpleList';
import './explore-capabilities.scss';
import {
  Text,
  TextContent,
} from '@patternfly/react-core/dist/dynamic/components/Text';

const ExploreCapabilities: React.FunctionComponent = () => {
  const [activeItem, setActiveItem] = React.useState(0);

  const drawerData = [
    {
      id: 'ex-toggle1',
      name: 'Get started with the Hybrid Cloud Console',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_Get-started.svg',
      title: 'Take a tour of the Console',
      body: "There's a lot to explore in the Hybrid Cloud Console, and understanding its capabilities will increase your efficiency.",
      buttonName: 'Start the guided tour',
      ouiaId: 'start-guided-tour-button',
    },
    {
      id: 'ex-toggle2',
      name: 'Try OpenShift on AWS',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_ROSA.svg',
      title: 'Get started with Red Hat OpenShift Service on AWS (ROSA)',
      body: 'Quickly build, deploy, and scale applications with our fully-managed turnkey application platform.',
      buttonName: 'Try ROSA',
      url: 'https://console.redhat.com/openshift/overview/rosa',
    },
    {
      id: 'ex-toggle3',
      name: 'Develop on the OpenShift Sandbox',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_sandbox.svg',
      title: 'Develop in the sandbox with the Red Hat Developer program',
      body: "Try Red Hat's products and technologies without setup or configuration.",
      buttonName: 'Explore the sandbox',
      url: 'https://console.redhat.com/openshift/sandbox',
    },
    {
      id: 'ex-toggle4',
      name: 'Analyze your envionments',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_Insights-analyze.svg',
      title: 'Continuously analyze with Red Hat Insights',
      body: 'Analyze platforms and applications from the console to better manage your hybrid cloud environments.',
      buttonName: 'Identify and resolve risks',
      url: 'https://console.redhat.com/insights/dashboard#SIDs=&tags=',
    },
    {
      id: 'ex-toggle5',
      name: 'Connect to subscriptions',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_subs.svg',
      title: 'Empower your buying decisions with data',
      body: 'Subscription Services provides reporting to help you make data-driven subscription choices.',
      buttonName: 'Explore subscriptions',
      url: 'https://console.redhat.com/insights/subscriptions/inventory#SIDs=&tags=',
    },
    {
      id: 'ex-toggle6',
      name: 'Convert your CentOS systems to RHEL',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_CentOS-to-RHEL.svg',
      title: 'Convert your CentOS systems to Red Hat Enterprise Linux',
      body: (
        <div>
          <p>
            On June 30, 2024, CentOS Linux 7 will reach End of Life (EOL), and
            those systems will stop receiving updates, security patches, and new
            features.
          </p>
          <p>
            Red Hat can help.{' '}
            <a
              href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/centos-migration"
              target="_blank"
              rel="noreferrer"
            >
              Learn more
            </a>{' '}
            about migrating your CentOS Linux systems to RHEL, whether
            on-premise or in the cloud.
          </p>
        </div>
      ),
      buttonName: 'Run a pre-conversion analysis',
      url: 'https://console.redhat.com/insights/tasks/available/convert-to-rhel-preanalysis?quickstart=insights-tasks-pre-conversion',
    },
    {
      id: 'ex-toggle7',
      name: 'Configure your console',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_configure.svg',
      title: 'Customize your notification settings',
      body: 'Opt-in and out of receiving notifications for your console services.',
      buttonName: 'Configure settings',
      url: 'https://console.redhat.com/settings/notifications',
    },
  ];

  const panelContent = (
    <>
      <DrawerPanelContent
        key={drawerData[activeItem].id}
        colorVariant="no-background"
      >
        <DrawerPanelBody className="pf-v5-u-display-flex pf-v5-u-flex-direction-row">
          <Card
            className="pf-v5-u-align-self-stretch pf-v5-u-flex-fill"
            isPlain
          >
            <CardBody className="pf-v5-u-p-0 ">
              <TextContent>
                <Text component="p" className="title pf-v5-u-mb-sm">
                  {drawerData[activeItem].title}
                </Text>
                <Text
                  component="p"
                  className="pf-v5-u-font-size-sm pf-v5-u-mb-sm"
                >
                  {drawerData[activeItem].body}
                </Text>
              </TextContent>
              <Button
                component="a"
                size="lg"
                href={drawerData[activeItem].url}
                className="pf-m-danger pf-v5-u-mb-sm cta-button"
                ouiaId={drawerData[activeItem].ouiaId}
              >
                {drawerData[activeItem].buttonName}
              </Button>
            </CardBody>
          </Card>
          <img
            className="widg-explore-image pf-v5-u-align-self-flex-start pf-v5-u-flex-none pf-v5-u-m-lg"
            src={drawerData[activeItem].img}
          />
        </DrawerPanelBody>
      </DrawerPanelContent>
    </>
  );

  const drawerContent = (
    <SimpleList>
      <SimpleListItem isActive onClick={() => setActiveItem(0)}>
        Get started with the Hybrid Cloud Console
      </SimpleListItem>
      <SimpleListItem onClick={() => setActiveItem(1)}>
        Try OpenShift with AWS
      </SimpleListItem>
      <SimpleListItem onClick={() => setActiveItem(2)}>
        Develop on the OpenShift Sandbox
      </SimpleListItem>
      <SimpleListItem onClick={() => setActiveItem(3)}>
        Analyze your environments
      </SimpleListItem>
      <SimpleListItem onClick={() => setActiveItem(4)}>
        Connect to your subscriptions
      </SimpleListItem>
      <SimpleListItem onClick={() => setActiveItem(5)}>
        Convert your CentOS systems to RHEL
      </SimpleListItem>
      <SimpleListItem onClick={() => setActiveItem(6)}>
        Configure your console
      </SimpleListItem>
    </SimpleList>
  );

  return (
    <React.Fragment>
      <Drawer className="widget-explore" isStatic>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>{drawerContent}</DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default ExploreCapabilities;
