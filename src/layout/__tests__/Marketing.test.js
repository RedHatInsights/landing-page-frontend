/*global describe, test, expect */

import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mapStateToProps } from '../Marketing';
import Body from '../Marketing';
import { ChartSpikeIcon } from '@patternfly/react-icons';

const activeTechnologiesMock = [
    {
        entitlement: 'test',
        marketing: true,
        marketingImage: ChartSpikeIcon,
        marketingText: 'Marketing Test',
        marketingUrl: '/marketing-test',
        name: 'test',
        id: 'test',
        url: 'test',
        baseApp: '/test',
        apps: {
            rules: '/app-test'
        },
        icon: ChartSpikeIcon,
        title: 'Jest Test',
        emptyTitle: 'test',
        emptyText: 'test',
        emptyAction: {
            title: 'test',
            navigate: '/empty-action-test'
        },
        body: 'test'
    }
];

const mockStore = configureMockStore();
const store = mockStore(activeTechnologiesMock);

function getInput(obj) {
    return {
        technologies: {
            activeTechnologies: [ obj ]
        }
    };
}

function getOutput(obj) {
    return { technologies: [ obj ]};
}

describe('mapStateToProps', () => {
    test('should return the re-wrapped data', () => {
        const data = {
            foo: 'bar',
            marketing: true
        };
        const output = mapStateToProps(getInput(data));
        expect(output).toEqual(getOutput(data));
    });
});

describe('render Marketing component', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <Body/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
