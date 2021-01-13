import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  StackItem,
  Title,
  Text,
  Button,
  Split,
  SplitItem,
} from '@patternfly/react-core';
import './styles/SecondPanelTile.scss';

const SecondPanelTile = ({ title, bodyText, buttonLabel }) => {
  return (
    <Stack className="ins-c-tile">
      <StackItem className="ins-c-tile ins-c-tile__title">
        <Title headingLevel="h1" size="md">
          {title}
        </Title>
      </StackItem>
      <StackItem>
        <Split className="ins-c-body-tile-content">
          <SplitItem isFilled>
            <Text>{bodyText}</Text>
          </SplitItem>
          <SplitItem>
            <Button
              variant="secondary"
              isSmall={true}
              className="ins-c-tile-button"
            >
              {buttonLabel}
            </Button>
          </SplitItem>
        </Split>
      </StackItem>
    </Stack>
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
