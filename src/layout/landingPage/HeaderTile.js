import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, StackItem, Title, Label } from '@patternfly/react-core';
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import './styles/HeaderTile.scss';

const HeaderTile = ({ header, title, labelText, labelColor, labelType }) => {
  // const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    console.log('This is my type: ', labelType);
  });

  return (
    <Stack className="ins-c-headerTile">
      <StackItem>
        <Title headingLevel="h2" size="lg">
          {header}
        </Title>
      </StackItem>
      <StackItem>
        <Title headingLevel="h2" size="lg">
          {title}
        </Title>
      </StackItem>
      <StackItem>
        <Label
          icon={<CheckCircleIcon />}
          variant="outline"
          className="ins-c-header-tile--label"
          color={labelColor}
        >
          {labelText}
        </Label>
      </StackItem>
    </Stack>
  );
};

HeaderTile.defaultProps = {
  labelText: ' lorem ipsum',
  labelColor: 'green',
  labelType: 'info',
};

HeaderTile.propTypes = {
  labelColor: PropTypes.string,
  labelType: PropTypes.string,
  title: PropTypes.string,
  header: PropTypes.string,
  labelText: PropTypes.string,
};

export default HeaderTile;
