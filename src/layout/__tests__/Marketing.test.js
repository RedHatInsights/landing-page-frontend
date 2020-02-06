/*global describe, test, expect */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { mapStateToProps } from '../Marketing';
import Marketing from '../Marketing';

const marketingTechnologiesMock = [
    {
        title: 'title',
        id: 'id',
        marketingImage: '',
        marketingText: 'marketingtext',
        marketingUrls: {
            learnMore: 'cloud.redhat.com'
        }
    }
];

const mockStore = configureMockStore();
const store = mockStore(marketingTechnologiesMock);

describe('render Body component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Provider store={ store }>
                <Marketing/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
