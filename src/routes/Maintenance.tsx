import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
} from '@patternfly/react-core/dist/dynamic/components/EmptyState';
import React from 'react';
import IconHourglass from '../components/icon-hourglass';

import './Maintenance.scss';

const isBeta = () => {
  return window.location.pathname.split('/')[1] === 'beta' ? '/beta' : '';
};

const Maintenance = () => (
  <section className="pf-v5-l-page__main-section pf-v5-c-page__main-section land-c-page__maintenance">
    <EmptyState variant={EmptyStateVariant.lg}>
      <EmptyStateHeader
        titleText="Maintenance in progress"
        icon={<EmptyStateIcon icon={IconHourglass} />}
        headingLevel="h5"
      />
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
      <EmptyStateFooter>
        <Button
          variant="primary"
          component="a"
          href={`${window.location.origin}${isBeta()}`}
        >
          Return to homepage
        </Button>
      </EmptyStateFooter>
    </EmptyState>
  </section>
);

export default Maintenance;
