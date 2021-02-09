import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Label, Text, Title } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';

const FirstPanelTile = ({
  count,
  section,
  title,
  labelText,
  labelColor,
  labelType,
}) => {
  useEffect(() => {
    console.log('This is my type: ', labelType);
  });

  return (
    <Flex className="tile">
      <FlexItem>
        <Text component="p" className="title">
          {section}
        </Text>
      </FlexItem>
      <FlexItem className="break" /> {/*break for mobile layout*/}
      <FlexItem className="count">
        <Title headingLevel="h6" className="count">
          {count}
        </Title>
      </FlexItem>
      <FlexItem className="name">
        <Text component="p">{title}</Text>
      </FlexItem>
      <FlexItem className="label">
        <Label icon={<CheckCircleIcon />} variant="outline" color={labelColor}>
          {labelText}
        </Label>
      </FlexItem>
    </Flex>
  );
};

FirstPanelTile.defaultProps = {
  labelText: ' lorem ipsum',
  labelColor: 'green',
  labelType: 'info',
};

FirstPanelTile.propTypes = {
  labelColor: PropTypes.string,
  labelType: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  section: PropTypes.string,
  labelText: PropTypes.string,
};

export default FirstPanelTile;
