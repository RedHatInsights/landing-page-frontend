import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Title, Text, Button } from '@patternfly/react-core';

const SecondPanelTile = ({ title, bodyText, buttonLabel }) => {
  return (
    <Flex className="ins-c-tile">
      <FlexItem className="ins-c-tile__title">
        <Title headingLevel="h2" size="md">
          {title}
        </Title>
      </FlexItem>
      <FlexItem>
        <Flex className="test">
          <FlexItem>
            <Text>{bodyText}</Text>
          </FlexItem>
          <FlexItem>
            <Button
              variant="secondary"
              isSmall={true}
              className="ins-c-tile-button"
            >
              {buttonLabel}
            </Button>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
};

SecondPanelTile.defaultProps = {
  tileItems: [],
  bodyText: 'Lorem ipsum dolor sit amet',
  title: '',
  buttonLabel: 'Action',
};

SecondPanelTile.propTypes = {
  title: PropTypes.string,
  bodyText: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default SecondPanelTile;
