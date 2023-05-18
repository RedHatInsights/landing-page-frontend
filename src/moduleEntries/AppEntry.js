import React from 'react';
import { Provider } from 'react-redux';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { init } from '../store';
import App from '../App';
import PropTypes from 'prop-types';

const AppRoot = ({ logger }) => (
  <Provider store={init(logger).getStore()}>
    <React.Fragment>
      <App />
      <NotificationsPortal />
    </React.Fragment>
  </Provider>
);

AppRoot.propTypes = {
  logger: PropTypes.func,
};

export default AppRoot;
