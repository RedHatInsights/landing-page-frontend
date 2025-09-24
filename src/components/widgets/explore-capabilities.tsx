import React from 'react';
import { Content } from '@patternfly/react-core/dist/dynamic/components/Content';
import {
  Card,
  CardBody,
} from '@patternfly/react-core/dist/dynamic/components/Card';
import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
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
      title: 'Try our products in the Developer Sandbox',
      body: 'The Developer Sandbox offers no-cost access to Red Hat products and technologies for trial use—no setup or configuration necessary.',
      ouiaId: 'explore-sandbox-button',
      url: 'https://sandbox.redhat.com',
    },
    {
      id: 'card4',
      img: '/apps/frontend-assets/technology-icons/insights.svg',
      title: 'Analyze RHEL environments',
      body: 'Analyze platforms and applications from the console to better manage your hybrid cloud environments.',
      ouiaId: 'analyze-risk-button',
      url: '/insights/dashboard#SIDs=&tags=',
    },
    {
      id: 'card5',
      img: '/apps/frontend-assets/technology-icons/rhel.svg',
      title: 'Convert from CentOS to RHEL',
      body: 'CentOS Linux 7 has reached End of Life (EOL). Prep your systems from conversion from CentOS to RHEL.',
      ouiaId: 'cent-os-button',
      url: '/insights/tasks/available/convert-to-rhel-analysis?quickstart=insights-tasks-pre-conversion',
    },
  ];

  const cardContent = cardData.map((cardData) => (
    <>
      <div key={cardData.id} className="pf-v6-u-m-0">
        <Link to={cardData.url}>
          <Card ouiaId={cardData.ouiaId} isFullHeight>
            <CardBody className="pf-v6-u-p-md pf-v6-u-text-align-center land-c-card__body-explore">
              <img
                className="pf-v5-u-justify-content-center"
                src={cardData.img}
              />
              <Content>
                <Content
                  component="p"
                  className="pf-v6-u-mb-0 pf-v6-u-font-size-sm"
                >
                  {cardData.title}
                </Content>
                <Content component="small" className="pf-v6-u-font-size-xs">
                  {cardData.body}
                </Content>
              </Content>
            </CardBody>
          </Card>
        </Link>
      </div>
    </>
  ));

  return (
    <React.Fragment>
      <Gallery className="widget-explore pf-v6-u-p-md">{cardContent}</Gallery>
    </React.Fragment>
  );
};

export default ExploreCapabilities;
