import React from 'react';
import {
  Card,
  CardBody,
} from '@patternfly/react-core/dist/dynamic/components/Card';
import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import {
  Text,
  TextContent,
} from '@patternfly/react-core/dist/dynamic/components/Text';
import { Link } from 'react-router-dom';

import './explore-capabilities.scss';

const ExploreCapabilities: React.FunctionComponent = () => {
  const cardData = [
    {
      id: 'card1',
      img: '/apps/frontend-assets/console-landing/widget-explore/logo_hat-only.svg',
      title: 'Get started with a tour',
      body: "Take a quick guided tour to understand how the Red Hat Hybrid Cloud Console's capabilities will increase your efficiency.",
      ouiaId: 'start-guided-tour-button',
      url: '',
    },
    {
      id: 'card2',
      img: '/apps/frontend-assets/console-landing/widget-explore/Logo-Red_Hat-AWS-A-Standard-RGB.svg',
      title: 'Try OpenShift on AWS',
      body: 'Quickly build, deploy, and scale applications with Red Hat OpenShift Service on AWS (ROSA), our fully-managed turnkey application platform.',
      ouiaId: 'try-rosa-button',
      url: '/openshift/overview/rosa',
    },
    {
      id: 'card3',
      img: '/apps/frontend-assets/console-landing/widget-explore/Logo-Red_Hat-Developer-A-Standard-RGB.svg',
      title: 'Develop in the Sandbox',
      body: "Try Red Hat's products and technologies without setup or configuration with the Development Sandbox for Red Hat OpenShift.",
      ouiaId: 'explore-sandbox-button',
      url: '/openshift/sandbox',
    },
    {
      id: 'card4',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_Insights-analyze.svg',
      title: 'Analyze RHEL environments',
      body: 'Analyze platforms and applications from the console to better manage your hybrid cloud environments.',
      ouiaId: 'analyze-risk-button',
      url: '/insights/dashboard#SIDs=&tags=',
    },
    {
      id: 'card5',
      img: '/apps/frontend-assets/console-landing/widget-explore/Explore_CentOS-to-RHEL.svg',
      title: 'Convert from CentOS to RHEL',
      body: 'CentOS Linux 7 has reached End of Life (EOL). Prep your systems from conversion from CentOS to RHEL.',
      ouiaId: 'cent-os-button',
      url: '/insights/tasks/available/convert-to-rhel-analysis?quickstart=insights-tasks-pre-conversion',
    },
  ];

  const cardContent = cardData.map((cardData) => (
    <>
      <div key={cardData.id} className="pf-v5-u-m-0">
        <Link to={cardData.url}>
          <Card isFullHeight isSelectableRaised>
            <CardBody className="pf-v5-u-p-md pf-v5-u-text-align-center land-c-card__body-explore">
              <img
                className="pf-v5-u-justify-content-center"
                src={cardData.img}
              />
              <TextContent>
                <Text
                  component="p"
                  className="pf-v5-u-mb-0 pf-v5-u-font-size-sm"
                >
                  {cardData.title}
                </Text>
                <Text component="small" className="pf-v5-u-font-size-xs">
                  {cardData.body}
                </Text>
              </TextContent>
            </CardBody>
          </Card>
        </Link>
      </div>
    </>
  ));

  return (
    <React.Fragment>
      <Gallery className="widget-explore pf-v5-u-p-md">{cardContent}</Gallery>
    </React.Fragment>
  );
};

export default ExploreCapabilities;
