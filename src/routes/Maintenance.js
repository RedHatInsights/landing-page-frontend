import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';
import React from 'react';
import IconHourglass from '../components/icon-hourglass';

import './Maintenance.scss';

const isBeta = () => {
  return window.location.pathname.split('/')[1] === 'beta' ? '/beta' : '';
};

const Maintenance = () => (
  <section className="pf-l-page__main-section pf-c-page__main-section land-c-page__maintenance">
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={IconHourglass} />
      <Title headingLevel="h5" size="lg">
        Maintenance in progress
      </Title>
      <EmptyStateBody>
        <p>
          console.redhat.com is currently undergoing scheduled maintenance and
          will be unavailable from 16:00 - 22:00 UTC (12:00 PM - 6:00 PM EST).
        </p>
        <p>
          For more information visit&nbsp;
          <a href="http://status.redhat.com/incidents/qw4mmmyzwzdg">
            status.redhat.com.
          </a>
        </p>
        <p>We will be back soon. Thank you for your patience!</p>
      </EmptyStateBody>
      <Button
        variant="primary"
        component="a"
        href={`${window.location.origin}${isBeta()}`}
      >
        Return to homepage
      </Button>
    </EmptyState>
  </section>
);

export default Maintenance;
