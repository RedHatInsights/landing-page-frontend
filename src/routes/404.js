import React from 'react';
import { Button, Title } from '@patternfly/react-core';
import Icon404 from '../components/icon-404';

import './404.scss';

// Chrome is not on this page, so do the isBeta here
const isBeta = () => {
  return window.location.pathname.split('/')[1] === 'beta' ? '/beta' : '';
};

const NotFound = () => (
  <div className="landing">
    <section className="pf-l-page__main-section pf-c-page__main-section land-c-page__404">
      <Title headingLevel="h1" size="3xl">
        404: We lost that page
      </Title>
      <Icon404 />
      <Title headingLevel="h2" className="land-c-text__sorry">
        Let&apos;s find you a new one. Try a new search or return home.
      </Title>
      <Button
        variant="link"
        component="a"
        href={`${window.location.origin}${isBeta()}`}
      >
        Return to homepage
      </Button>
    </section>
  </div>
);

export default NotFound;
