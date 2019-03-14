import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './layout/Header';
import Body from './layout/Body';
import FooterMenu from './layout/FooterMenu';
import FooterTraditional from './layout/FooterTraditional';

import { technologiesLoaded } from './store/actions';
import './App.scss';
import { activeTechnologies } from './consts';
import { registry as registryDecorator, Main } from '@red-hat-insights/insights-frontend-components';
import technologiesReducer from './store/technologiesReducer';

@registryDecorator()
class App extends Component {
    componentDidMount () {
        this.getRegistry().register({ technologies: technologiesReducer });
        const { loadTechnologies } = this.props;
        insights.chrome.init();
        insights.chrome.identifyApp('landing');
        loadTechnologies(activeTechnologies);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <Main>
                    <Body />
                </Main>
                <FooterMenu />
                <FooterTraditional/>
            </Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    loadTechnologies: PropTypes.func
};

App.defaultProps = {
    loadTechnologies: () => undefined
};

function dispatchToProps(dispatch) {
    return {
        loadTechnologies: (data) => dispatch(technologiesLoaded(data))
    };
}

export default withRouter(connect(null, dispatchToProps)(App));
