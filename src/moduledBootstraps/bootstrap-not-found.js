import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NotFound from '../moduleEntries/NotFoundEntry';
import { createStore, combineReducers } from 'redux';
import technologiesReducer from '../store/technologiesReducer';

ReactDOM.render(
  <Provider
    store={createStore(
      combineReducers({ technologies: technologiesReducer }, {})
    )}
  >
    <NotFound />
  </Provider>,
  document.getElementById('root')
);
