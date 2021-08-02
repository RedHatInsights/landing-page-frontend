import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../carousel';

import FirstPanelTile from './first-panel-tile';

const EstateRenderer = ({ sections = [] }) => (
  /** Use the show prop to decide how items will be visible pre slide */
  <Carousel show={3}>
    {sections.map((tile) => (
      <FirstPanelTile {...tile} key={tile.id} />
    ))}
  </Carousel>
);

EstateRenderer.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ),
};

export default EstateRenderer;
