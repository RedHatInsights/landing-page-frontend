import React from 'react';
import FirstPanelTile from '../../layout/landingPage/FirstPanelTile';

const estateRenderer = (sections) =>
  sections.map(
    ({ id, title = 'Unknow', count = 'N/A', ...rest } = {}, index) => (
      <FirstPanelTile count={count} title={title} {...rest} key={id || index} />
    )
  );

export default estateRenderer;
