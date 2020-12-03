import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { mapStateToProps } from '../Body';
import Body from '../Body';
import insightsMarketing from '../../components/marketing/insightsMarketing.svg';
import Insights from '../../components/Insights.svg';

const activeTechnologiesMock = [
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
];

const mockStore = configureMockStore();
const store = mockStore(activeTechnologiesMock);

function getInput(obj) {
  return {
    technologies: {
      activeTechnologies: [obj],
    },
  };
}

function getOutput(obj) {
  return { technologies: [obj] };
}

describe('mapStateToProps', () => {
  test('should return the re-wrapped data', () => {
    const data = { foo: 'bar' };
    const output = mapStateToProps(getInput(data));
    expect(output).toEqual(getOutput(data));
  });

  test('should filter out inactive', () => {
    const data = {
      foo: 'bar',
      baz: { disabled: true },
    };
    const output = mapStateToProps(getInput(data));
    expect(output).toEqual(getOutput(data));
  });

  test('should only filter out disabled:true', () => {
    const data = {
      foo: 'bar',
      bar: { disabled: false },
      baz: { disabled: true },
    };
    const output = mapStateToProps(getInput(data));
    expect(output).toEqual(getOutput(data));
  });
});

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
