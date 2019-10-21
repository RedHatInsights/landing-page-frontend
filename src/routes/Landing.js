import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Modal,
    Button,
    Title,
    Stack,
    StackItem
} from '@patternfly/react-core';

import Header from '../layout/Header';
import Body from '../layout/Body';
import Marketing from '../layout/Marketing';
import FooterTraditional from '../layout/FooterTraditional';
import { activeTechnologies } from '../consts';
import './Landing.scss';

class Landing extends Component {
    state = {
        isModalOpen: false
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
            }
        }).catch(() => {
            this.setState({ unauthed: true });
        });

    }

    handleModalToggle = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { isModalOpen, not_entitled: notEntitled, unauthed } = this.state;

        return (
            <Fragment>
                { unauthed
                    ? <Marketing />
                    : <Fragment>
                        <Header />
                        <Body />
                    </Fragment>
                }
                <FooterTraditional />
                { notEntitled && <Modal
                    title={ 'You are not entitled to use this application' }
                    className='ins-c-error-modal'
                    hideTitle={ true }
                    isOpen={ isModalOpen }
                    onClose={ this.handleModalToggle }
                >
                    <Stack gutter='md' className='ins-c-error-state'>
                        <StackItem className='ins-c-error-state__title'>
                            <Title headingLevel="h3" size="2xl">{ notEntitled.emptyTitle }</Title>
                        </StackItem>
                        <StackItem className='ins-c-error-state__image'>
                            { notEntitled.icon && <notEntitled.icon
                                className="ins-c-icon__active"
                                aria-hidden
                                alt={ `${notEntitled.title} logo` }
                                { ...notEntitled.iconProps }
                            /> }
                            { notEntitled.image && <img
                                className="ins-c-application-info__logo"
                                aria-hidden
                                src={ notEntitled.image }
                                alt={ `${notEntitled.title} logo` } /> }
                        </StackItem>
                        <StackItem className='ins-c-error-state__body'>
                            { notEntitled.emptyText }
                        </StackItem>
                        <StackItem className='ins-c-error-state__footer'>
                            {
                                notEntitled.emptyAction.title &&
                                    <Button variant="primary" className='ins-c-error-state__footer-action' onClick={ () => {
                                        if (notEntitled.emptyAction.navigate) {
                                            window.location.href = notEntitled.emptyAction.navigate;
                                        }
                                    } } >
                                        { notEntitled.emptyAction.title }
                                    </Button>
                            }
                            <Button variant="link" className='ins-c-error-state__footer-close' onClick={ this.handleModalToggle }>
                                { notEntitled.emptyAction.close ? `${notEntitled.emptyAction.close }` : 'Close' }
                            </Button>
                        </StackItem>
                    </Stack>
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
