import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { init } from '../store';
import App from '../App';
import PropTypes from 'prop-types';

const pathName = window.location.pathname.split('/');
pathName.shift();

const AppRoot = ({ logger }) => (
  <Provider store={init(logger).getStore()}>
    <React.Fragment>
      <Router basename={`/${pathName[0] === 'beta' ? 'beta/' : ''}`}>
        <App />
      </Router>
      <NotificationsPortal />
    </React.Fragment>
  </Provider>
);

AppRoot.propTypes = {
  logger: PropTypes.func,
};

export default AppRoot;
