/*global describe, test, expect */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { mapStateToProps } from '../Body';
import ConnectedBody, { Body } from '../Body';
import { ChartSpikeIcon } from '@patternfly/react-icons';

const activeTechnologiesMock = [
    {
        title: 'title',
        id: '1',
        description: 'this is a description',
        icon: ChartSpikeIcon,
        apps: [
            {
                id: 'app-1',
                name: 'app-name-1',
                url: 'app-url-1'
            }
        ]
    },
    {
        title: 'secondtitle',
        id: '2',
        description: 'this is a second description',
        icon: ChartSpikeIcon,
        apps: [
            {
                id: 'app-2',
                name: 'app-name-2',
                url: 'app-url-2'
            }
        ]
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
        const data = { foo: 'bar' };
        const output = mapStateToProps(getInput(data));
        expect(output).toEqual(getOutput(data));
    });

    test('should filter out inactive', () => {
        const data = {
            foo: 'bar',
            baz: { disabled: true }
        };
        const output = mapStateToProps(getInput(data));
        expect(output).toEqual(getOutput(data));
    });

    test('should only filter out disabled:true', () => {
        const data = {
            foo: 'bar',
            bar: { disabled: false },
            baz: { disabled: true }
        };
        const output = mapStateToProps(getInput(data));
        expect(output).toEqual(getOutput(data));
    });
});

describe('render ConnectedBody component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Provider store={ store }>
                <ConnectedBody/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('render Body component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Body technologies={ activeTechnologiesMock }/>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
