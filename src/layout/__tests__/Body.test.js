import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import Body from '../Body';

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

const mockStore = configureMockStore();
const store = mockStore();

describe('render Body component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Body />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
