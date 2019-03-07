import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main, PageHeader } from '@red-hat-insights/insights-frontend-components';
import Header from './layout/Header';
import Body from './layout/Body';
import Foot from './layout/Foot';
import { technologiesLoaded } from './store/actions';
import './App.scss';
import { activeTechnologies } from './consts';
import { registry as registryDecorator } from '@red-hat-insights/insights-frontend-components';
import technologiesReducer from './store/technologiesReducer';
import { RhLogo } from './components';

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
                <PageHeader className="pf-m-light">
                    <Header />
                </PageHeader>
                <Main>
                    <Body />
                </Main>
                <div>
                    <Foot />
                </div>
                <footer className="ins-c-footer">
                    <RhLogo />
                    <div>
                        <p className="copyright">Copyright © 2019 Red Hat, Inc.</p>
                        <nav>
                            <a className="nav-link" href="https://www.redhat.com/en/about/privacy-policy">
                                Privacy Policy
                            </a>
                            <a className="nav-link" href="https://access.redhat.com/help/terms/">
                                Terms of Use
                            </a>
                            <a className="nav-link" href="https://www.redhat.com/en/about/all-policies-guidelines">
                                All Policies and Guidelines
                            </a>
                        </nav>
                    </div>
                </footer>
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
