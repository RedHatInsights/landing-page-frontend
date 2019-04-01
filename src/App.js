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
import {
    Modal,
    Button,
    EmptyState,
    EmptyStateIcon,
    Title,
    EmptyStateBody
} from '@patternfly/react-core';

@registryDecorator()
class App extends Component {
    state = {
        isModalOpen: false
    }

    componentDidMount () {
        this.getRegistry().register({ technologies: technologiesReducer });
        const { loadTechnologies, location } = this.props;
        insights.chrome.init();
        insights.chrome.identifyApp('landing');
        loadTechnologies(activeTechnologies);
        const params = location.search.slice(1).split('&').reduce((acc, curr) => ({
            ...acc,
            [curr.split('=')[0]]: Object.values(activeTechnologies).find(item => item.entitlement === curr.split('=')[1])
        }), {});
        this.setState({
            ...params,
            isModalOpen: params && Object.keys(params).length > 0
        });
    }

    handleModalToggle = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { isModalOpen, not_entitled: notEntitled } = this.state;
        return (
            <Fragment>
                <Header/>
                <Main>
                    <Body />
                </Main>
                <FooterMenu />
                <FooterTraditional/>
                { notEntitled && <Modal
                    title={ 'You are not entitled to use this application' }
                    isOpen={ isModalOpen }
                    onClose={ this.handleModalToggle }
                >
                    <EmptyState>
                        <EmptyStateIcon
                            icon={ notEntitled.icon }
                            className="ins-c-icon__active"
                            { ...notEntitled.iconProps }
                            { ...notEntitled.emptyProps }
                        />
                        <Title headingLevel="h5" size="lg">{ notEntitled.emptyTitle }</Title>
                        <EmptyStateBody>
                            { notEntitled.emptyText }
                        </EmptyStateBody>
                        <Button variant="primary">{ notEntitled.emptyAction.title }</Button>
                        <Button variant="link" onClick={ this.handleModalToggle }>Close</Button>
                    </EmptyState>
                </Modal> }
            </Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    loadTechnologies: PropTypes.func,
    location: PropTypes.shape({
        search: PropTypes.string
    })
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
