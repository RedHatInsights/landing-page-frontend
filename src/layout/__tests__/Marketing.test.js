/*global describe, test, expect */

import { mapStateToProps } from '../Marketing';

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
