import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Text,
  Title,
} from '@patternfly/react-core';

const FirstPanelTile = ({ count, section, title }) => {
  return (
    <DescriptionListGroup className="estate-group">
      <DescriptionListDescription
        className={classnames('estate-section', {
          'is-empty': section?.length === 0,
        })}
      >
        <Text component="p">
          {section}&nbsp;
          {/** empty line char is required to keep proper horizontal alignment. Empty "p" tag does not have height */}
        </Text>
      </DescriptionListDescription>
      <DescriptionListTerm className="estate-count">
        <Title headingLevel="h5" size="3xl">
          {count}
        </Title>
      </DescriptionListTerm>
      <DescriptionListDescription className="estate-title">
        <Text component="p">{title}</Text>
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

FirstPanelTile.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  section: PropTypes.string,
};

export default FirstPanelTile;
