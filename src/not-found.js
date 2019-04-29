import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NotFound from './NotFound';
import { createStore, combineReducers } from 'redux';
import technologiesReducer from './store/technologiesReducer';

/**
 * Hooks up redux to app.
 *  https://redux.js.org/advanced/usage-with-react-router
 */
ReactDOM.render(
    <Provider store={ createStore(combineReducers({ technologies: technologiesReducer }, {})) }>
        <NotFound />
    </Provider>,
    document.getElementById('root')
);
