/* eslint-disable react/display-name */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Modal, Title } from '@patternfly/react-core';
import { ScalprumProvider } from '@scalprum/react-core';

import axiosInstance from '../../utils/axiosInstance';

import * as notifications from '@redhat-cloud-services/frontend-components-notifications/redux/actions/notifications';

import Landing from '../Landing';

import * as actions from '../../store/actions';

import Footer from '../../components/app-content-renderer/footer';
import FirstPanel from '../../components/app-content-renderer/first-panel';
import RecommendationsPanel from '../../components/app-content-renderer/recommendations-panel';
import Loading from '../../layout/Loading';
import * as technologies from '../../consts';
import data from './self-service-schema-mock.json';

jest.mock('../../components/app-content-renderer/first-panel', () => ({
  __esModule: true,
  default: () => <span>FirstPanel</span>,
}));

jest.mock(
  '../../components/app-content-renderer/recommendations-panel',
  () => ({
    __esModule: true,
    default: () => <span>RecommendationsPanel</span>,
  })
);

jest.mock('../../components/app-content-renderer/footer', () => ({
  __esModule: true,
  default: () => <span>Footer</span>,
}));

jest.mock('../../consts', () => {
  const consts = jest.requireActual('../../consts');

  return {
    __esModule: true,
    ...consts,
    activeTechnologies: [
      {
        ...consts.activeTechnologies[0],
        // disable image because img with svg has some issues
        image: undefined,
      },
      consts.activeTechnologies.find(
        ({ entitlement }) => entitlement === 'settings'
      ),
      {
        ...consts.activeTechnologies.find(
          ({ entitlement }) => entitlement === 'migrations'
        ),
        image: undefined,
      },
    ],
  };
});

jest.mock('../../utils/axiosInstance', () => {
  return {
    __esModule: true,
    default: {
      get: () => Promise.resolve({}),
    },
  };
});

const mockStore = configureMockStore();
const store = mockStore({});

describe('Landing component renders authenticated page', () => {
  let loadDataSpy;
  let addNotificationSpy;
  const getSpy = jest
    .spyOn(axiosInstance, 'get')
    .mockImplementation(() => Promise.resolve(data));

  /**
   * Modal is appended to root not body
   */
  beforeAll(() => {
    const elem = document.createElement('div');
    elem.id = 'root';
    document.body.appendChild(elem);
  });

  afterAll(() => {
    const elem = document.getElementById('root');
    document.body.removeChild(elem);
    getSpy.mockReset();
  });

  beforeEach(() => {
    loadDataSpy = jest
      .spyOn(actions, 'loadData')
      .mockImplementation(() => ({ type: 'nonsense' }));
    addNotificationSpy = jest
      .spyOn(notifications, 'addNotification')
      .mockImplementation(() => ({ type: 'nonsense' }));
  });

  afterEach(() => {
    loadDataSpy.mockReset();
    addNotificationSpy.mockReset();
  });

  it('should render correctly', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <ScalprumProvider api={{ chrome: { getEnvironment: () => '' } }}>
          <Provider store={store}>
            <Router>
              <Landing />
            </Router>
          </Provider>
        </ScalprumProvider>
      );
    });

    expect(wrapper.find(Loading)).toHaveLength(1);
    expect(wrapper.find(FirstPanel)).toHaveLength(0);
    expect(wrapper.find(RecommendationsPanel)).toHaveLength(0);
    expect(wrapper.find(Footer)).toHaveLength(0);
    expect(wrapper.find(Modal)).toHaveLength(0);

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();

    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(RecommendationsPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    // there is a modal in footer
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('isUnauthed', async () => {
    let wrapper;
    const spy = jest
      .spyOn(insights.chrome.auth, 'getUser')
      .mockImplementationOnce(() => Promise.resolve(undefined));

    await act(async () => {
      wrapper = mount(
        <ScalprumProvider api={{ chrome: { getEnvironment: () => '' } }}>
          <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
              <Landing />
            </MemoryRouter>
          </Provider>
        </ScalprumProvider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();

    expect(wrapper.find(Loading)).toHaveLength(1);
    expect(wrapper.find(FirstPanel)).toHaveLength(0);
    expect(wrapper.find(RecommendationsPanel)).toHaveLength(0);
    expect(wrapper.find(Footer)).toHaveLength(0);

    spy.mockRestore();
  });

  it('isNotEntitled', async () => {
    let wrapper;
    const insightsInfo = technologies.activeTechnologies[0];

    await act(async () => {
      wrapper = mount(
        <ScalprumProvider api={{ chrome: { getEnvironment: () => '' } }}>
          <Provider store={store}>
            <MemoryRouter
              initialEntries={[
                {
                  pathname: '/beta',
                  search: `not_entitled=${insightsInfo.entitlement}`,
                },
              ]}
            >
              <Landing />
            </MemoryRouter>
          </Provider>
        </ScalprumProvider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(RecommendationsPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Modal)).toHaveLength(2);

    let modalEntitled = wrapper.find(Modal).last();

    expect(modalEntitled.props().isOpen).toEqual(true);

    expect(modalEntitled.find(Title).text()).toEqual('');
    expect(
      modalEntitled.find('.land-c-error-modal__content').last().text()
    ).toEqual('Close');
    expect(
      modalEntitled.find('.land-c-error-modal__footer--primary')
    ).toHaveLength(0);
    expect(
      modalEntitled.find('.land-c-error-modal__footer--secondary .pf-m-link')
    ).toHaveLength(0);

    await act(async () => {
      wrapper.find('button.land-c-error-modal__close').simulate('click');
    });

    wrapper.update();

    modalEntitled = wrapper.find(Modal).last();

    expect(modalEntitled.props().isOpen).toEqual(false);
  });

  it('isNotEntitled with alert', async () => {
    let wrapper;
    const settingsInfo = technologies.activeTechnologies[1];
    await act(async () => {
      wrapper = mount(
        <ScalprumProvider api={{ chrome: { getEnvironment: () => '' } }}>
          <Provider store={store}>
            <MemoryRouter
              initialEntries={[
                {
                  pathname: '/beta',
                  search: `not_entitled=${settingsInfo.entitlement}`,
                },
              ]}
            >
              <Landing />
            </MemoryRouter>
          </Provider>
        </ScalprumProvider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(RecommendationsPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Modal)).toHaveLength(1);

    expect(addNotificationSpy).toHaveBeenCalledWith({
      title: settingsInfo.emptyAlertTitle,
      variant: 'danger',
    });
  });

  it('isNotEntitled with secondary action', async () => {
    let wrapper;
    const migrationInfo = technologies.activeTechnologies[2];
    await act(async () => {
      wrapper = mount(
        <ScalprumProvider api={{ chrome: { getEnvironment: () => '' } }}>
          <Provider store={store}>
            <MemoryRouter
              initialEntries={[
                {
                  pathname: '/beta',
                  search: `not_entitled=${migrationInfo.entitlement}`,
                },
              ]}
            >
              <Landing />
            </MemoryRouter>
          </Provider>
        </ScalprumProvider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(RecommendationsPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Modal)).toHaveLength(1);

    let modalEntitled = wrapper.find(Modal).last();

    expect(modalEntitled.props().isOpen).toEqual(false);
  });
});
