import React from 'react';
import PropTypes from 'prop-types';
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Text,
  Title,
} from '@patternfly/react-core';

const FirstPanelTile = ({ count, section, title }) => {
  return (
    <DescriptionListGroup>
      <DescriptionListDescription>
        <Text component="p">
          {section}&nbsp;
          {/** empty line char is required to keep proper horizontal alignment. Empty "p" tag does not have height */}
        </Text>
      </DescriptionListDescription>
      <DescriptionListTerm>
        <Title headingLevel="h6" size="2xl">
          {count}
        </Title>
      </DescriptionListTerm>
      <DescriptionListDescription>
        <Text component="p">{title}</Text>
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

FirstPanelTile.defaultProps = {
  labelText: ' OK',
  variant: 'success',
};

FirstPanelTile.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  section: PropTypes.string,
};

export default FirstPanelTile;
