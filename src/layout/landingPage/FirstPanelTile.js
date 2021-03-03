import React from 'react';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Label, Text, Title } from '@patternfly/react-core'; //
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-triangle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

const FirstPanelTile = ({ count, section, title, labelText, variant }) => {
  let color;
  let icon;

  switch (variant) {
    case 'success':
      color = 'green';
      icon = <CheckCircleIcon />;
      break;
    case 'warning':
      color = 'orange';
      icon = <ExclamationTriangleIcon />;
      break;
    case 'danger':
      color = 'red';
      icon = <ExclamationCircleIcon />;
      break;
  }

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
      <FlexItem className="label ins-m-hidden">
        <Label icon={icon} variant="outline" color={color}>
          {labelText}
        </Label>
      </FlexItem>
    </Flex>
  );
};

FirstPanelTile.defaultProps = {
  labelText: ' OK',
  variant: 'success',
};

FirstPanelTile.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  section: PropTypes.string,
  labelText: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'danger', 'warning']),
};

export default FirstPanelTile;
