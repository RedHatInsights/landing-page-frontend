import React from 'react';
import { DescriptionList } from '@patternfly/react-core';
import { shallowEqual, useSelector } from 'react-redux';

import estateRenderer from '../../components/app-content-renderer/estate-renderer';

import './styles/Panels.scss';

const FirstPanel = () => {
  const estate = useSelector(
    ({ contentStore: { estate } }) => estate,
    shallowEqual
  );
  return (
    // To customize breakpoints etc use https://www.patternfly.org/v4/components/description-list#examples
    <DescriptionList isAutoFit className="first-level pf-u-p-lg">
      {estateRenderer(estate)}
    </DescriptionList>
  );
};

export default FirstPanel;
