import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Card, CardBody, CardFooter } from '@patternfly/react-core';

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
          tryIt: '/tryit-test',
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
      {
        entitlement: 'test-2',
        marketing: false,
      },
    ],
  };
});

describe('render Marketing component', () => {
  it('should render correctly', async () => {
    const wrapper = mount(<Body />);
    expect(toJson(wrapper)).toMatchSnapshot();

    // filters technology without marketing set to true
    expect(wrapper.find(Card)).toHaveLength(1);

    const testCard = wrapper.find(Card);

    expect(testCard.find(CardBody).text()).toEqual('Marketing Test');
    expect(testCard.find(CardFooter).find('a').first().text()).toEqual(
      'Learn more'
    );
    expect(testCard.find(CardFooter).find('a').first().props().href).toEqual(
      '/marketing-test'
    );

    expect(testCard.find(CardFooter).find('a').last().text()).toEqual('Try it');
    expect(testCard.find(CardFooter).find('a').last().props().href).toEqual(
      '/tryit-test'
    );
  });
});
