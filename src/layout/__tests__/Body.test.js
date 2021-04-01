import React from 'react';
import toJson from 'enzyme-to-json';
import Body from '../Body';
import { PermissionContext } from '../../App';

jest.mock('../../consts', () => {
  const insightsMarketing = require('../../components/marketing/insightsMarketing.svg')
    .default;
  const Insights = require('../../components/Insights.svg').default;

  return {
    activeTechnologies: [
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
        icon: Insights,
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
  it('should render correctly', () => {
    const wrapper = shallow(
      <PermissionContext.Provider value={{ isOrgAdmin: true }}>
        <Body />
      </PermissionContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
