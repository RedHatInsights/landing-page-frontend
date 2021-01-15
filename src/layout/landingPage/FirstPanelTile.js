import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, StackItem, Label } from '@patternfly/react-core';
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
    <Stack className="tile">
      <StackItem>
        <p className="count">{header}</p>
      </StackItem>
      <StackItem>
        <p className="name">{title}</p>
      </StackItem>
      <StackItem>
        <Label
          icon={<CheckCircleIcon />}
          variant="outline"
          className="label"
          color={labelColor}
        >
          {labelText}
        </Label>
      </StackItem>
    </Stack>
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
