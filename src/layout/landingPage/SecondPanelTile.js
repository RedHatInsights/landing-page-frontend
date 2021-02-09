import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Title, Button } from '@patternfly/react-core';

const SecondPanelTile = ({ title, bodyText, buttonLabel }) => {
  return (
    <Flex className="tile">
      <FlexItem>
        <Title headingLevel="h5" size="sm">
          {bodyText}
          {title}
        </Title>
      </FlexItem>
      <FlexItem align={{ default: 'alignRight' }}>
        <Button variant="secondary" isSmall={true}>
          {buttonLabel}
        </Button>
      </FlexItem>
    </Flex>
  );
};

SecondPanelTile.defaultProps = {
  tileItems: [],
  bodyText: 'Lorem ipsum dolor sit amet, con se cte tur adip iscing elit',
  title: '',
  buttonLabel: 'Action',
};

SecondPanelTile.propTypes = {
  title: PropTypes.string,
  bodyText: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default SecondPanelTile;
