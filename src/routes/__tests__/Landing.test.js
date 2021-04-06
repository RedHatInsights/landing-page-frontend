/* eslint-disable react/display-name */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Modal, Title } from '@patternfly/react-core';

import * as notifications from '@redhat-cloud-services/frontend-components-notifications/redux/actions/notifications';

import Landing from '../Landing';

import * as actions from '../../store/actions';

import Footer from '../../components/app-content-renderer/footer';
import FirstPanel from '../../components/app-content-renderer/first-panel';
import SecondPanel from '../../components/app-content-renderer/second-panel';
import Marketing from '../../layout/Marketing';
import Loading from '../../layout/Loading';
import * as technologies from '../../consts';

jest.mock('../../components/app-content-renderer/first-panel', () => ({
  __esModule: true,
  default: () => <span>FirstPanel</span>,
}));

jest.mock('../../components/app-content-renderer/second-panel', () => ({
  __esModule: true,
  default: () => <span>SecondPanel</span>,
}));

jest.mock('../../components/app-content-renderer/footer', () => ({
  __esModule: true,
  default: () => <span>Footer</span>,
}));

jest.mock('../../layout/Marketing', () => ({
  __esModule: true,
  default: () => <span>marketing</span>,
}));

jest.mock('../../consts', () => {
  const { activeTechnologies } = jest.requireActual('../../consts');

  return {
    __esModule: true,
    activeTechnologies: [
      {
        ...activeTechnologies[0],
        // disable image because img with svg has some issues
        image: undefined,
      },
      activeTechnologies.find(({ entitlement }) => entitlement === 'settings'),
      {
        ...activeTechnologies.find(
          ({ entitlement }) => entitlement === 'migrations'
        ),
        image: undefined,
      },
    ],
  };
});

const mockStore = configureMockStore();
const store = mockStore({});

describe('Landing component renders authenticated page', () => {
  let wrapper;
  let loadDataSpy;
  let addNotificationSpy;

  beforeEach(() => {
    loadDataSpy = jest
      .spyOn(actions, 'loadData')
      .mockImplementation(() => ({ type: 'nonsense' }));
    addNotificationSpy = jest
      .spyOn(notifications, 'addNotification')
      .mockImplementation(() => ({ type: 'nonsense' }));
  });

  afterEach(() => {
    loadDataSpy.mockRestore();
    addNotificationSpy.mockRestore();
  });

  it('should render correctly', async () => {
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Landing />
          </Router>
        </Provider>
      );
    });

    expect(wrapper.find(Loading)).toHaveLength(1);
    expect(wrapper.find(FirstPanel)).toHaveLength(0);
    expect(wrapper.find(SecondPanel)).toHaveLength(0);
    expect(wrapper.find(Footer)).toHaveLength(0);
    expect(wrapper.find(Marketing)).toHaveLength(0);
    expect(wrapper.find(Modal)).toHaveLength(0);

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();

    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(SecondPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Marketing)).toHaveLength(0);
    // there is a modal in footer
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('isUnauthed', async () => {
    const spy = jest
      .spyOn(insights.chrome.auth, 'getUser')
      .mockImplementation(() => Promise.resolve(undefined));

    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Landing />
          </Router>
        </Provider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();

    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(0);
    expect(wrapper.find(SecondPanel)).toHaveLength(0);
    expect(wrapper.find(Footer)).toHaveLength(0);
    expect(wrapper.find(Marketing)).toHaveLength(1);
    expect(wrapper.find(Modal)).toHaveLength(1);

    spy.mockRestore();
  });

  it('isNotEntitled', async () => {
    const insightsInfo = technologies.activeTechnologies[0];

    let tmpLocation;

    tmpLocation = Object.assign({}, window.location);
    delete window.location;
    window.location = {};
    window.location.href = '/beta/';
    window.location.pathname = '/beta/';
    window.location.search = `?not_entitled=${insightsInfo.entitlement}`;

    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Landing />
          </Router>
        </Provider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(SecondPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Marketing)).toHaveLength(0);
    expect(wrapper.find(Modal)).toHaveLength(2);

    let modalEntitled = wrapper.find(Modal).last();

    expect(modalEntitled.props().isOpen).toEqual(true);

    expect(modalEntitled.find(Title).text()).toEqual(insightsInfo.emptyTitle);
    expect(
      modalEntitled.find('.ins-c-error-state__body').last().text()
    ).toEqual(insightsInfo.emptyText);
    expect(
      modalEntitled.find('.ins-c-error-state__footer-action').last().text()
    ).toEqual(insightsInfo.emptyAction.primary.title);
    expect(
      modalEntitled.find('.ins-c-error-state__footer-secondary')
    ).toHaveLength(0);
    expect(
      modalEntitled.find('.ins-c-error-state__footer-close').last().text()
    ).toEqual(insightsInfo.emptyAction.close.title);

    await act(async () => {
      wrapper.find('button.ins-c-error-state__footer-close').simulate('click');
    });

    wrapper.update();

    modalEntitled = wrapper.find(Modal).last();

    expect(modalEntitled.props().isOpen).toEqual(false);

    window.location = tmpLocation;
  });

  it('isNotEntitled with alert', async () => {
    const settingsInfo = technologies.activeTechnologies[1];

    let tmpLocation;

    tmpLocation = Object.assign({}, window.location);
    delete window.location;
    window.location = {};
    window.location.href = '/beta/';
    window.location.pathname = '/beta/';
    window.location.search = `?not_entitled=${settingsInfo.entitlement}`;

    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Landing />
          </Router>
        </Provider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(SecondPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Marketing)).toHaveLength(0);
    expect(wrapper.find(Modal)).toHaveLength(1);

    expect(addNotificationSpy).toHaveBeenCalledWith({
      title: settingsInfo.emptyAlertTitle,
      variant: 'danger',
    });

    window.location = tmpLocation;
  });

  it('isNotEntitled with secondary action', async () => {
    const migrationInfo = technologies.activeTechnologies[2];

    let tmpLocation;

    tmpLocation = Object.assign({}, window.location);
    delete window.location;
    window.location = {};
    window.location.href = '/beta/';
    window.location.pathname = '/beta/';
    window.location.search = `?not_entitled=${migrationInfo.entitlement}`;

    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <Landing />
          </Router>
        </Provider>
      );
    });

    wrapper.update();

    expect(loadDataSpy).toHaveBeenCalled();
    expect(addNotificationSpy).not.toHaveBeenCalled();
    expect(wrapper.find(Loading)).toHaveLength(0);
    expect(wrapper.find(FirstPanel)).toHaveLength(1);
    expect(wrapper.find(SecondPanel)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Marketing)).toHaveLength(0);
    expect(wrapper.find(Modal)).toHaveLength(2);

    let modalEntitled = wrapper.find(Modal).last();

    expect(modalEntitled.props().isOpen).toEqual(true);

    expect(modalEntitled.find(Title).text()).toEqual(migrationInfo.emptyTitle);
    expect(
      modalEntitled.find('.ins-c-error-state__body').last().text()
    ).toEqual(migrationInfo.emptyText);
    expect(
      modalEntitled.find('.ins-c-error-state__footer-action').last().text()
    ).toEqual(migrationInfo.emptyAction.primary.title);
    expect(
      modalEntitled.find('.ins-c-error-state__footer-secondary').last().text()
    ).toEqual(migrationInfo.emptyAction.secondary.title);
    expect(
      modalEntitled.find('.ins-c-error-state__footer-close').last().text()
    ).toEqual(migrationInfo.emptyAction.close.title);

    window.location = tmpLocation;
  });
});
