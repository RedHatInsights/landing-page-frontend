import React from 'react';
import FirstPanelTile from '../../layout/landingPage/FirstPanelTile';

const EstateRenderer = ({ sections }) =>
  sections.map((tile) => <FirstPanelTile {...tile} key={tile.id} />);

export default EstateRenderer;
