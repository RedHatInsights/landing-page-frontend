/*global describe, test, expect */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { mapStateToProps } from '../Body';
import Body from '../Body';
import { ChartSpikeIcon } from '@patternfly/react-icons';

const activeTechnologiesMock = [
    {
        entitlement: 'entitlement',
        title: 'title',
        description: 'this is a description',
        icon: ChartSpikeIcon,
        apps: [
            {
                id: 'migration-services',
                name: 'Migration Services',
                url: 'migrations'
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

describe('render Body component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Provider store={ store }>
                <Body/>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
