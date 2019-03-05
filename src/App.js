import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

class App extends Component {
    componentDidMount () {
        insights.chrome.init();
        insights.chrome.identifyApp('advisor');
    }

    render() {
        return (
            <div>Landing page</div>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

export default withRouter(connect()(App));
