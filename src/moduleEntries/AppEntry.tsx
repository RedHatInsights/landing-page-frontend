import React from 'react';
import App from '../App';

const pathName = window.location.pathname.split('/');
pathName.shift();

const AppRoot = ({ layoutType }: { layoutType?: string }) => <App layoutType={layoutType} />;

export default AppRoot;
