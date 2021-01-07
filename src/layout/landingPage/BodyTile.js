import React from 'react';
import PropTypes from 'prop-types';
import {
  Level,
  LevelItem,
  Stack,
  StackItem,
  Title,
  Text,
  Button,
} from '@patternfly/react-core';

const BodyTile = ({ title, bodyText, buttonLabel, tileItems }) => {
  const renderTileItems = (tileItems) => {
    <div>
      {tileItems.map(() => {
        console.log('Try me: ', tileItems);
      })}
    </div>;
  };

  return (
    <Stack>
      <StackItem>
        <Title headingLevel="h1" size="md">{title}</Title>
      </StackItem>
      <StackItem>
        <Level>
          <LevelItem>{renderTileItems(tileItems)}</LevelItem>
          <LevelItem>
            <Text>{bodyText}</Text>
          </LevelItem>
          <LevelItem>
            <Button>{buttonLabel}</Button>
          </LevelItem>
        </Level>
      </StackItem>
    </Stack>
  );
};

BodyTile.defaultProps = {
  tileItems: [],
  bodyText: '',
  title: '',
  buttonLabel: '',
};

BodyTile.propTypes = {
  tileItems: PropTypes.array,
  title: PropTypes.string,
  bodyText: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default BodyTile;
