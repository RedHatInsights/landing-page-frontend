import React from 'react';
import App from '../App';

const AppRoot: React.FC<{ layoutType?: string }> = ({ layoutType }) => (
  <App layoutType={layoutType} />
);

export default AppRoot;
