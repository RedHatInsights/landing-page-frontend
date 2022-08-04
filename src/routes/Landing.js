import React, { Fragment, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalVariant,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';

import FooterTraditional from '../layout/FooterTraditional';
import Loading from '../layout/Loading';
import { activeTechnologies } from '../consts';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

import './Landing.scss';
import '../components/app-content-renderer/styles/panels.scss';

// Mockup console landing page
import FirstPanel from '../components/app-content-renderer/first-panel';
import SecondPanel from '../components/app-content-renderer/second-panel';
import Footer from '../components/app-content-renderer/footer';

import { loadData } from '../store/actions';
import createContentData from '../contentApi/create-content-data';

import { loadPermissions } from '../utils/allPermissions';
import { useLocation } from 'react-router-dom';

const init = (initialState, search) => {
  const params = search
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

  return {
    ...initialState,
    notEntitled: params.not_entitled,
    isModalOpen: params && Object.keys(params).length > 0,
  };
};

const initialState = {
  isModalOpen: false,
  isUserReady: false,
  notEntitled: undefined,
};

const reducer = (state, { type, user }) => {
  switch (type) {
    case 'finishLoading':
      return { ...state, isUserReady: user ? true : false };
    case 'closeModal':
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
};

const Landing = () => {
  const { getEnvironment } = useChrome();
  const { search } = useLocation();
  const [{ isModalOpen, isUserReady, notEntitled }, stateDispatch] = useReducer(
    reducer,
    initialState,
    (initialState) => init(initialState, search)
  );
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      createContentData(getEnvironment()).then((data) => {
        dispatch(loadData(data));
      });

      const [user] = await Promise.all([
        insights.chrome.auth.getUser(),
        loadPermissions(),
      ]);

      stateDispatch({ type: 'finishLoading', user });
    } catch {
      stateDispatch({ type: 'finishLoading' });
    }
  }, []);

  const handleModalToggle = () => {
    stateDispatch({ type: 'closeModal' });
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
      <Split className="land-c-page-layout">
        <SplitItem className="land-c-page-content">
          <Fragment>
            <FirstPanel />
            <SecondPanel />
            <Footer />
            <FooterTraditional />
          </Fragment>
          {notEntitled &&
            notEntitled.emptyAlertTitle &&
            renderAlert(notEntitled.emptyAlertTitle)}
          {notEntitled && !notEntitled.emptyAlertTitle && (
            <Modal
              className="landing land-c-error-modal"
              variant={ModalVariant.medium}
              app-entitlement={notEntitled.emptyID}
              isOpen={isModalOpen}
              onClose={handleModalToggle}
              aria-label={notEntitled.emptyTitle}
              header={
                <Title
                  headingLevel="h2"
                  size="2xl"
                  className="land-c-error-modal__header"
                >
                  {notEntitled.emptyTitle}
                </Title>
              }
            >
              <Stack hasGutter className="land-c-error-modal__content">
                <StackItem className="land-c-error-modal__content--image">
                  {notEntitled.icon && (
                    <notEntitled.icon
                      className="land-c-icon__active"
                      aria-hidden
                      alt={`${notEntitled.title} logo`}
                      {...notEntitled.iconProps}
                    />
                  )}
                  {notEntitled.image && (
                    <img
                      className="land-c-application-info__logo"
                      aria-hidden
                      src={notEntitled.image}
                      alt={`${notEntitled.title} logo`}
                    />
                  )}
                </StackItem>
                <StackItem className="land-c-error-modal__content--body">
                  {notEntitled.emptyText}
                </StackItem>
                <StackItem className="land-c-error-modal__content--footer">
                  {notEntitled?.emptyAction?.primary && (
                    <Button
                      variant="primary"
                      className="land-c-error-modal__content--footer-primary"
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
                  <section className="land-c-error-modal__content--footer-secondary">
                    {notEntitled?.emptyAction?.secondary &&
                      notEntitled.emptyAction.secondary.navigate && (
                        <Button
                          variant="link"
                          onClick={() => {
                            window.location.href =
                              notEntitled.emptyAction.secondary.navigate;
                          }}
                        >
                          {notEntitled.emptyAction.secondary.title
                            ? `${notEntitled.emptyAction.secondary.title}`
                            : 'Learn more'}
                        </Button>
                      )}
                    {notEntitled?.emptyAction?.secondary &&
                      !notEntitled.emptyAction.secondary.navigate && (
                        <Button variant="link">
                          {notEntitled.emptyAction.secondary.title
                            ? `${notEntitled.emptyAction.secondary.title}`
                            : 'Learn more'}
                        </Button>
                      )}
                    <Button
                      variant="link"
                      className="land-c-error-modal__close"
                      onClick={handleModalToggle}
                    >
                      {notEntitled?.emptyAction?.close
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

export default Landing;
