import React from 'react';
import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import { Drawer } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerContent } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerContentBody } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerPanelBody } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { DrawerPanelContent } from '@patternfly/react-core/dist/dynamic/components/Drawer';
import { SimpleList } from '@patternfly/react-core/dist/dynamic/components/SimpleList';
import { SimpleListItem } from '@patternfly/react-core/dist/dynamic/components/SimpleList';
import { Split } from '@patternfly/react-core/dist/dynamic/layouts/Split';
import { SplitItem } from '@patternfly/react-core/dist/dynamic/layouts/Split';
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
      url: 'https://app.pendo.io/s/5300167311360000/guides/60TJ9PZKMXQ9tDS-WC6bMr46C-U?view=settings',
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
        <span>
          On June 30, 2024, CentOS Linux 7 will reach End of Life (EOL), and
          those systems will stop receiving updates, security patches, and new
          features.
          <br></br>
          Red Hat can help.{' '}
          <a
            href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/centos-migration"
            target="_blank"
            rel="noreferrer"
          >
            Learn more
          </a>{' '}
          about migrating your CentOS Linux systems to RHEL, whether on-premise
          or in the cloud.
        </span>
      ),
      buttonName: 'Run a pre-conversion analysis',
      url: 'https://console.redhat.com/insights/tasks?quickstart=insights-tasks-pre-conversion#SIDs=&tags=',
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
        widths={{ default: 'width_66' }}
        colorVariant="no-background"
      >
        <DrawerPanelBody>
          <Split>
            <SplitItem isFilled>
              <TextContent>
                <Text component="h2" className="pf-v5-u-mb-sm">
                  {drawerData[activeItem].title}
                </Text>
                <Text
                  component="p"
                  className="pf-v5-u-font-size-md pf-v5-u-mb-sm"
                >
                  {drawerData[activeItem].body}
                </Text>
                <Button
                  size="lg"
                  component="a"
                  href={drawerData[activeItem].url}
                  className="pf-m-danger pf-v5-u-mb-sm"
                >
                  {drawerData[activeItem].buttonName}
                </Button>
              </TextContent>
            </SplitItem>
            <SplitItem className="pf-v5-u-pl-sm">
              <img src={drawerData[activeItem].img} />
            </SplitItem>
          </Split>
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
      <Drawer className="widget-explore pf-v5-u-mr-sm" isStatic>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>{drawerContent}</DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
};

export default ExploreCapabilities;
