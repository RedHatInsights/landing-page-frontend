import React from 'react';
import { Content } from '@patternfly/react-core/dist/dynamic/components/Content';
import {
  Card,
  CardBody,
} from '@patternfly/react-core/dist/dynamic/components/Card';
import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

import './index.scss';

const messages = defineMessages({
  tourTitle: {
    id: 'landing.explore.tour.title',
    description: 'Explore capabilities card title',
    defaultMessage: 'Get started with a tour',
  },
  tourBody: {
    id: 'landing.explore.tour.body',
    description: 'Explore capabilities card body',
    defaultMessage:
      "Take a quick guided tour to understand how the Red Hat Hybrid Cloud Console's capabilities will increase your efficiency.",
  },
  tourAlt: {
    id: 'landing.explore.tour.alt',
    description: 'Explore capabilities card alt',
    defaultMessage: 'Red Hat logo',
  },
  rosaTitle: {
    id: 'landing.explore.rosa.title',
    description: 'Explore capabilities card title',
    defaultMessage: 'Try OpenShift on AWS',
  },
  rosaBody: {
    id: 'landing.explore.rosa.body',
    description: 'Explore capabilities card body',
    defaultMessage:
      'Quickly build, deploy, and scale applications with Red Hat OpenShift Service on AWS (ROSA), our fully-managed turnkey application platform.',
  },
  rosaAlt: {
    id: 'landing.explore.rosa.alt',
    description: 'Explore capabilities card alt',
    defaultMessage: 'Red Hat and Amazon Web Services logos',
  },
  sandboxTitle: {
    id: 'landing.explore.sandbox.title',
    description: 'Explore capabilities card title',
    defaultMessage: 'Try our products in the Developer Sandbox',
  },
  sandboxBody: {
    id: 'landing.explore.sandbox.body',
    description: 'Explore capabilities card body',
    defaultMessage:
      'The Developer Sandbox offers no-cost access to Red Hat products and technologies for trial use—no setup or configuration necessary.',
  },
  sandboxAlt: {
    id: 'landing.explore.sandbox.alt',
    description: 'Explore capabilities card alt',
    defaultMessage: 'Red Hat Developer logo',
  },
  analyzeTitle: {
    id: 'landing.explore.analyze.title',
    description: 'Explore capabilities card title',
    defaultMessage: 'Analyze RHEL environments',
  },
  analyzeBody: {
    id: 'landing.explore.analyze.body',
    description: 'Explore capabilities card body',
    defaultMessage:
      'Analyze platforms and applications from the console to better manage your hybrid cloud environments.',
  },
  analyzeAlt: {
    id: 'landing.explore.analyze.alt',
    description: 'Explore capabilities card alt',
    defaultMessage: 'Red Hat Lightspeed logo',
  },
  convertTitle: {
    id: 'landing.explore.convert.title',
    description: 'Explore capabilities card title',
    defaultMessage: 'Convert from CentOS to RHEL',
  },
  convertBody: {
    id: 'landing.explore.convert.body',
    description: 'Explore capabilities card body',
    defaultMessage:
      'CentOS Linux 7 has reached End of Life (EOL). Prep your systems from conversion from CentOS to RHEL.',
  },
  convertAlt: {
    id: 'landing.explore.convert.alt',
    description: 'Explore capabilities card alt',
    defaultMessage: 'Red Hat Enterprise Linux logo',
  },
  migrationTitle: {
    id: 'landing.explore.migration.title',
    description: 'Explore capabilities card title',
    defaultMessage: 'Migration Advisor: VMware to Openshift',
  },
  migrationBody: {
    id: 'landing.explore.migration.body',
    description: 'Explore capabilities card body',
    defaultMessage:
      'Discover your VMware environment, select a target cluster and create a migration plan.',
  },
  migrationAlt: {
    id: 'landing.explore.migration.alt',
    description: 'Explore capabilities card alt',
    defaultMessage: 'Red Hat Enterprise Linux logo',
  },
});

const ExploreCapabilities: React.FunctionComponent = () => {
  const intl = useIntl();
  const cardData = [
    {
      id: 'card1',
      img: '/apps/frontend-assets/red-hat-logos/logo_hat-only.svg',
      alt: intl.formatMessage(messages.tourAlt),
      title: intl.formatMessage(messages.tourTitle),
      body: intl.formatMessage(messages.tourBody),
      ouiaId: 'start-guided-tour-button',
      url: '',
    },
    {
      id: 'card2',
      img: '/apps/frontend-assets/red-hat-logos/logo-red_hat-aws-a-standard-rgb.svg',
      alt: intl.formatMessage(messages.rosaAlt),
      title: intl.formatMessage(messages.rosaTitle),
      body: intl.formatMessage(messages.rosaBody),
      ouiaId: 'try-rosa-button',
      url: '/openshift/overview/rosa',
    },
    {
      id: 'card3',
      img: '/apps/frontend-assets/red-hat-logos/logo-red_hat-developer-a-standard-rgb.svg',
      alt: intl.formatMessage(messages.sandboxAlt),
      title: intl.formatMessage(messages.sandboxTitle),
      body: intl.formatMessage(messages.sandboxBody),
      ouiaId: 'explore-sandbox-button',
      url: 'https://sandbox.redhat.com',
    },
    {
      id: 'card4',
      img: '/apps/frontend-assets/technology-icons/lightspeed.svg',
      alt: intl.formatMessage(messages.analyzeAlt),
      title: intl.formatMessage(messages.analyzeTitle),
      body: intl.formatMessage(messages.analyzeBody),
      ouiaId: 'analyze-risk-button',
      url: '/insights/dashboard#SIDs=&tags=',
    },
    {
      id: 'card5',
      img: '/apps/frontend-assets/technology-icons/rhel.svg',
      title: intl.formatMessage(messages.convertTitle),
      alt: intl.formatMessage(messages.convertAlt),
      body: intl.formatMessage(messages.convertBody),
      ouiaId: 'cent-os-button',
      url: '/insights/tasks/available/convert-to-rhel-analysis?quickstart=insights-tasks-pre-conversion',
    },
    {
      id: 'card6',
      img: '/apps/frontend-assets/red-hat-logos/logo_hat-only.svg',
      alt: intl.formatMessage(messages.migrationAlt),
      title: intl.formatMessage(messages.migrationTitle),
      body: intl.formatMessage(messages.migrationBody),
      ouiaId: 'migration-assessment-button',
      url: '/openshift/migration-advisor',
    },
  ];

  const cardContent = cardData.map((cardData) => (
    <div key={cardData.id} className="pf-v6-u-m-0">
      <Link to={cardData.url}>
        <Card ouiaId={cardData.ouiaId} isFullHeight>
          <CardBody className="pf-v6-u-p-md pf-v6-u-text-align-center land-c-card__body-explore">
            <img
              className="pf-v6-u-justify-content-center"
              src={cardData.img}
              alt={cardData.alt}
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
  ));

  return (
    <React.Fragment>
      <Gallery className="widget-explore pf-v6-u-p-md">{cardContent}</Gallery>
    </React.Fragment>
  );
};

export default ExploreCapabilities;
