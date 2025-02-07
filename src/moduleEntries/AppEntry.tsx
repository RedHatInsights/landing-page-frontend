import React from 'react';
import App from '../App';

const pathName = window.location.pathname.split('/');
pathName.shift();

const AppRoot: React.FC<{ layoutType?: string }> = ({ layoutType }) => (
  <App layoutType={layoutType} />
);

export default AppRoot;
