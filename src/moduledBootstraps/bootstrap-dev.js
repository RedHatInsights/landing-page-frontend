import React from 'react';
import ReactDOM from 'react-dom';
import AppEntry from '../moduleEntries/AppEntry';
import logger from 'redux-logger';

const rootEl = document.getElementById('root');

ReactDOM.render(<AppEntry logger={logger} />, rootEl);
