import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Body from '../Body';
import { PermissionContext } from '../../App';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  PageSection,
} from '@patternfly/react-core';

jest.mock('../../consts', () => {
  const insightsMarketing = require('../../components/marketing/insightsMarketing.svg')
    .default;

  return {
    activeTechnologies: [
      {
        entitlement: 'test-disabled',
        disabled: true,
      },
      {
        entitlement: 'test',
        marketing: true,
        marketingImage: insightsMarketing,
        marketingText: 'Marketing Test',
        marketingUrl: '/marketing-test',
        name: 'test',
        id: 'test',
        url: 'test',
        baseApp: '/test',
        apps: {
          rules: '/app-test',
        },
        // eslint-disable-next-line react/display-name
        icon: () => <span id="fake-icon">fake Icon</span>,
        title: 'Jest Test',
        emptyTitle: 'test',
        emptyText: 'test',
        emptyAction: {
          title: 'test',
          navigate: '/empty-action-test',
        },
        body: 'test',
      },
    ],
  };
});

describe('render Body component', () => {
  let wrapper;

  it('should render correctly when it is entitled', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        insights: { is_entitled: false },
        openshift: { is_entitled: true },
      })
    );

    await act(async () => {
      wrapper = mount(
        <PermissionContext.Provider value={{ isOrgAdmin: true }}>
          <Body />
        </PermissionContext.Provider>
      );
    });
    wrapper.update();

    // filter disabled apps
    expect(wrapper.find(Card)).toHaveLength(1);

    expect(wrapper.find(PageSection).props()['needs-rbac-tour']).toEqual(
      'false'
    );

    expect(wrapper.find(CardHeader).text()).toEqual('fake IconJest Test');
    expect(wrapper.find(CardBody).text()).toEqual('testrules');
    expect(wrapper.find(CardFooter).text()).toEqual(' Open ');
  });

  it('should render correctly when it is not entitled', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        insights: { is_entitled: true },
        openshift: { is_entitled: true },
      })
    );

    await act(async () => {
      wrapper = mount(
        <PermissionContext.Provider value={{ isOrgAdmin: true }}>
          <Body />
        </PermissionContext.Provider>
      );
    });
    wrapper.update();

    // filter disabled apps
    expect(wrapper.find(Card)).toHaveLength(1);

    expect(wrapper.find(PageSection).props()['needs-rbac-tour']).toEqual(
      'true'
    );

    expect(wrapper.find(CardHeader).text()).toEqual('fake IconJest Test');
    expect(wrapper.find(CardBody).text()).toEqual('testrules');
    expect(wrapper.find(CardFooter).text()).toEqual(' Open ');
  });
});
