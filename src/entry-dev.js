import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';
import logger from 'redux-logger';

const pathName = window.location.pathname.split('/');
const rootEl = document.getElementById('root');
pathName.shift();

ReactDOM.render(
    <Provider store={ init(logger).getStore() }>
        <Router basename={ `/${pathName[0] === 'beta' ? 'beta/' : ''}` }>
            <App />
        </Router>
    </Provider>,

    rootEl,
    () => rootEl.setAttribute('data-ouia-safe', true)
);
