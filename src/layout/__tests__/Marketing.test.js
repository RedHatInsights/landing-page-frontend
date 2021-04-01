import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Body from '../Marketing';

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
        marketingUrls: {
          learnMore: '/marketing-test',
          tryit: '/tryit-test',
        },
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

describe('render Marketing component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Body />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
