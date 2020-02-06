/*global describe, test, expect */

import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mapStateToProps } from '../Marketing';
import ConnectedMarketing, { Marketing } from '../Marketing';
import { ChartSpikeIcon } from '@patternfly/react-icons';

const marketingTechnologiesMock = [
    {
        title: 'title',
        id: 'id',
        marketingImage: ChartSpikeIcon,
        marketingText: 'marketingText',
        marketingUrls: {
            learnMore: 'https://www.redhat.com/en/technologies/management/insights'
        }
    }
];

const mockStore = configureMockStore();
const store = mockStore(marketingTechnologiesMock);

function getInput(obj) {
    return {
        technologies: {
            marketingTechnologies: [ obj ]
        }
    };
}

function getOutput(obj) {
    return { technologies: [ obj ]};
}

describe('mapStateToProps', () => {
    test('should return the re-wrapped data', () => {
        const data = { foo: 'bar' };
        const output = mapStateToProps(getInput(data));
        expect(output).toEqual(getOutput(data));
    });
});

describe('render Marketing component', () => {
    it('should render correctly connected', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <ConnectedMarketing/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render correctly', () => {
        const wrapper = shallow(
            <Marketing/>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
