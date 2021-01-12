import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  Stack,
  StackItem,
  Title,
  SplitItem,
  Split,
} from '@patternfly/react-core';
import Body from '../layout/Body';
import Marketing from '../layout/Marketing';
import FooterTraditional from '../layout/FooterTraditional';
import Loading from '../layout/Loading';
import { activeTechnologies } from '../consts';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/cjs/actions';
import './Landing.scss';
import Navigation from '../components/navigation';
import navigationReducer from '../components/navigation/navigation-reducer';
import NavigationContext from '../components/navigation/navigation-context';

const Landing = () => {
  const [state, internalDispatch] = useReducer(navigationReducer, {
    isOpen: false,
    activeSection: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserReady, setIsUserReady] = useState(false);
  const [isUnauthed, setIsUnauthed] = useState(true);
  const [notEntitled, setIsNotEntitled] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = location.search
      .slice(1)
      .split('&')
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr.split('=')[0]]: Object.values(activeTechnologies).find(
            (item) => item.entitlement === curr.split('=')[1]
          ),
        }),
        {}
      );

    setIsNotEntitled(params.not_entitled);
    setIsModalOpen(params && Object.keys(params).length > 0);

    window.insights.chrome.auth
      .getUser()
      .then((user) => {
        if (user) {
          setIsUnauthed(false);
        } else {
          setIsUnauthed(true);
        }
      })
      .catch(() => {
        setIsUnauthed(true);
      })
      .then(() => setIsUserReady(true));
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(false);
    history.pushState(null, '', location.href.split('?')[0]);
  };

  const renderAlert = (title) => {
    dispatch(
      addNotification({
        variant: 'danger',
        title,
      })
    );
  };

  if (isUserReady) {
    return (
      <Split className="ins-c-page__landing-layout">
        {!isUnauthed && (
          <SplitItem className="ins-c-page__landing-navigation">
            <NavigationContext.Provider value={{ state, internalDispatch }}>
              <Navigation />
            </NavigationContext.Provider>
          </SplitItem>
        )}
        <SplitItem>
          {isUnauthed ? (
            <Marketing />
          ) : (
            <NavigationContext.Provider value={{ state, internalDispatch }}>
              <Body />
            </NavigationContext.Provider>
          )}
          <FooterTraditional />
          {notEntitled &&
            notEntitled.emptyAlertTitle &&
            renderAlert(notEntitled.emptyAlertTitle)}
          {notEntitled && !notEntitled.emptyAlertTitle && (
            <Modal
              className="ins-c-error-modal"
              app-entitlement={notEntitled.emptyID}
              isOpen={isModalOpen}
              onClose={handleModalToggle}
              aria-title={notEntitled.emptyTitle}
              header={
                <Title headingLevel="h2" size="2xl">
                  {notEntitled.emptyTitle}
                </Title>
              }
            >
              <Stack hasGutter className="ins-c-error-state">
                <StackItem className="ins-c-error-state__image">
                  {notEntitled.icon && (
                    <notEntitled.icon
                      className="ins-c-icon__active"
                      aria-hidden
                      alt={`${notEntitled.title} logo`}
                      {...notEntitled.iconProps}
                    />
                  )}
                  {notEntitled.image && (
                    <img
                      className="ins-c-application-info__logo"
                      aria-hidden
                      src={notEntitled.image}
                      alt={`${notEntitled.title} logo`}
                    />
                  )}
                </StackItem>
                <StackItem className="ins-c-error-state__body">
                  {notEntitled.emptyText}
                </StackItem>
                <StackItem className="ins-c-error-state__footer">
                  {notEntitled.emptyAction.primary && (
                    <Button
                      variant="primary"
                      className="ins-c-error-state__footer-action"
                      onClick={() => {
                        if (notEntitled.emptyAction.primary.navigate) {
                          window.location.href =
                            notEntitled.emptyAction.primary.navigate;
                        }
                      }}
                    >
                      {notEntitled.emptyAction.primary.title}
                    </Button>
                  )}
                  <section className="ins-c-error-state__footer-action--secondary">
                    {notEntitled.emptyAction.secondary &&
                      notEntitled.emptyAction.secondary.navigate && (
                        <Button
                          variant="link"
                          className="ins-c-error-state__footer-secondary"
                          onClick={() => {
                            window.location.href =
                              notEntitled.emptyAction.secondary.navigate;
                          }}
                        >
                          {notEntitled.emptyAction.secondary.title
                            ? `${notEntitled.emptyAction.secondary.title}`
                            : 'Learn More'}
                        </Button>
                      )}
                    {notEntitled.emptyAction.secondary &&
                      !notEntitled.emptyAction.secondary.navigate && (
                        <Button
                          variant="link"
                          className="ins-c-error-state__footer-secondary"
                        >
                          {notEntitled.emptyAction.secondary.title
                            ? `${notEntitled.emptyAction.secondary.title}`
                            : 'Learn More'}
                        </Button>
                      )}
                    <Button
                      variant="link"
                      className="ins-c-error-state__footer-close"
                      onClick={handleModalToggle}
                    >
                      {notEntitled.emptyAction.close
                        ? `${notEntitled.emptyAction.close.title}`
                        : 'Close'}
                    </Button>
                  </section>
                </StackItem>
              </Stack>
            </Modal>
          )}
        </SplitItem>
      </Split>
    );
  } else {
    return <Loading />;
  }
};

Landing.propTypes = {
  history: PropTypes.object,
  loadTechnologies: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

Landing.defaultProps = {
  loadTechnologies: () => undefined,
};

export default withRouter(Landing);
