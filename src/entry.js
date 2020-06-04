import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications';
import App from './App';

const pathName = window.location.pathname.split('/');
const rootEl = document.getElementById('root');
pathName.shift();

ReactDOM.render(
    <Provider store={ init().getStore() }>
        <React.Fragment>
            <Router basename={ `/${pathName[0] === 'beta' ? 'beta/' : ''}` }>
                <App />
            </Router>
            <NotificationsPortal/>
        </React.Fragment>
    </Provider>,

    rootEl,
    () => rootEl.setAttribute('data-ouia-safe', true)
);
