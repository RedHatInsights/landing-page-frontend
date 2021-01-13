import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Title,
  Text,
  Button,
} from '@patternfly/react-core';
import './styles/SecondPanelTile.scss';

const BodyTile = ({ title, bodyText, buttonLabel, tileItems }) => { //eslint-disable-line
  // const renderTileItems = (tileItems) => {
  //   <div>
  //     {tileItems.map(() => {
  //       console.log('Try me: ', tileItems);
  //     })}
  //   </div>;
  // };

  return (
    <Stack>
      <StackItem className="ins-c-tile ins-c-tile__title">
        <Title headingLevel="h1" size="md">
          {title}
        </Title>
      </StackItem>
      <StackItem>
        <Flex className="ins-c-body-tile-content">
          {/* <FlexItem>{renderTileItems(tileItems)}</FlexItem> */}
          <FlexItem>
            <Text>{bodyText}</Text>
          </FlexItem>
          <FlexItem
            align={{ default: 'alignRight' }}
            justifyContent={{ default: 'justifyContentFlexEnd' }}
          >
            <Button
              variant="secondary"
              isSmall={true}
              className="ins-c-tile-button"
            >
              {buttonLabel}
            </Button>
          </FlexItem>
        </Flex>
      </StackItem>
    </Stack>
  );
};

BodyTile.defaultProps = {
  tileItems: [],
  bodyText: 'Lorem ipsum dolor sit amet',
  title: '',
  buttonLabel: 'Action',
};

BodyTile.propTypes = {
  tileItems: PropTypes.array,
  title: PropTypes.string,
  bodyText: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default BodyTile;
