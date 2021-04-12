import React from 'react';

import FirstPanelTile from './first-panel-tile';

const EstateRenderer = ({ sections }) =>
  sections.map((tile) => <FirstPanelTile {...tile} key={tile.id} />);

export default EstateRenderer;
