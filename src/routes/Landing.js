import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Modal,
    Button,
    EmptyState,
    EmptyStateIcon,
    Title,
    EmptyStateBody
} from '@patternfly/react-core';

import Header from '../layout/Header';
import Body from '../layout/Body';
import Marketing from '../layout/Marketing';
import FooterMenu from '../layout/FooterMenu';
import FooterTraditional from '../layout/FooterTraditional';
import { activeTechnologies } from '../consts';
import './Landing.scss';
import { red } from 'ansi-colors';

class Landing extends Component {
    state = {
        isModalOpen: false,
        iframeFlag: false
    }

    componentDidMount() {
        const { location } = this.props;

        const params = location.search.slice(1).split('&').reduce((acc, curr) => ({
            ...acc,
            [curr.split('=')[0]]: Object.values(activeTechnologies).find(item => item.entitlement === curr.split('=')[1])
        }), {});

        this.setState({
            ...params,
            isModalOpen: params && Object.keys(params).length > 0
        });

        window.insights.chrome.auth.getUser().then(user => {
            if (user) {
                this.setState({ unauthed: false });
            } else {
                this.setState({ unauthed: true });
                this.setState({ iframeFlag: true });
            }
        }).catch(() => {
            this.setState({ unauthed: true });
        });


    }

    iframeStyle = {
        height: '0',
        width: '0',
        border: 'none',
    };

    iframeSrc = <p></p>;
    
    iFrameCheckAuth = () =>{
        alert(this.state.iframeFlag)
        if (this.state.iframeFlag) {
            window.insights.chrome.auth.checkAuth()
        }
        
    }
    handleIframeToggle = () => {
        this.setState({ iframeFlag: false }),
        alert(this.state.iframeFlag + "landing 73 handleIframeToggle")
    }

    handleModalToggle = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { isModalOpen, not_entitled: notEntitled, unauthed, iframeFlag } = this.state;
        //console.log(iframeFlag + "landing 81 handleIframeToggle")
        return (
            <Fragment>
                <iframe src= {iframeFlag ? 'login.html' : undefined} style={this.iframeStyle} onLoad={this.handleIframeToggle}></iframe>
                { unauthed
                    ? <Marketing />
                    : <Fragment>
                        <Header />
                        <Body />
                        <FooterMenu />
                    </Fragment>
                }
                <FooterTraditional />
                { notEntitled && <Modal
                    title={ 'You are not entitled to use this application' }
                    isOpen={ isModalOpen }
                    onClose={ this.handleModalToggle }
                >
                    <EmptyState>
                        { notEntitled.icon && <EmptyStateIcon
                            icon={ notEntitled.icon }
                            className="ins-c-icon__active"
                            { ...notEntitled.iconProps }
                            size="lg"
                        /> }
                        { notEntitled.image && <img
                            className="ins-c-application-info__logo"
                            aria-hidden
                            src={ notEntitled.image }
                            alt={ `${notEntitled.title} logo` } /> }
                        <Title headingLevel="h5" size="lg">{ notEntitled.emptyTitle }</Title>
                        <EmptyStateBody>
                            { notEntitled.emptyText }
                        </EmptyStateBody>
                        {
                            notEntitled.emptyAction &&
                            <Button variant="primary" onClick={ () => {
                                if (notEntitled.emptyAction.navigate) {
                                    window.location.href = notEntitled.emptyAction.navigate;
                                }
                            } } >
                                { notEntitled.emptyAction.title }
                            </Button>
                        }
                        <Button variant="link" onClick={ this.handleModalToggle }>Close</Button>
                    </EmptyState>
                </Modal> }
            </Fragment>
        );
    }
}

Landing.propTypes = {
    history: PropTypes.object,
    loadTechnologies: PropTypes.func,
    location: PropTypes.shape({
        search: PropTypes.string
    })
};

Landing.defaultProps = {
    loadTechnologies: () => undefined
};

export default withRouter(Landing);
