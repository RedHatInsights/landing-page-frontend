import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import { Title } from '@patternfly/react-core/dist/dynamic/components/Title';
import React from 'react';

import './Logout.scss';

const onButtonClick = (url: string) => {
  window.location.href = `./${url}`;
};

const Logout = () => (
  <section className="pf-v5-l-page__main-section pf-v5-c-page__main-section land-c-page__logout">
    <Title headingLevel="h1" size="3xl">
      You have logged out.
    </Title>
    <Button variant="link" onClick={() => onButtonClick('')}>
      Take me home
    </Button>
  </section>
);

export default Logout;
