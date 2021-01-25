import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Label, Title } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';

const FirstPanelTile = ({
  header,
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
        <Title headingLevel="h6" className="count">
          {header}
        </Title>
      </FlexItem>
      <FlexItem className="name">
        <p>{title}</p>
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
  header: PropTypes.string,
  labelText: PropTypes.string,
};

export default FirstPanelTile;
