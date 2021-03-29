import React from 'react';
import { DescriptionList } from '@patternfly/react-core';
import { shallowEqual, useSelector } from 'react-redux';
import EstateRenderer from '../../components/app-content-renderer/estate-renderer';

import './styles/Panels.scss';

const FirstPanel = () => {
  const estate = useSelector(
    ({ contentStore: { estate } }) =>
      estate
        .filter(({ id, ...tile }) => {
          const result = !!id;
          if (!result) {
            console.error(
              `Estate tile ${JSON.stringify(
                tile
              )} does not have required attribute "id" and is excluded`
            );
          }
          return result;
        })
        .slice(0, 6),
    shallowEqual
  );
  return (
    <DescriptionList isAutoFit className="first-level pf-u-p-lg">
      <EstateRenderer sections={estate} />
    </DescriptionList>
  );
};

export default FirstPanel;
