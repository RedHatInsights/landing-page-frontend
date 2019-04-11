/*global describe, test, expect */

import { mapStateToProps } from './Body';

function getInput(obj) {
    return {
        technologies: {
            activeTechnologies: obj
        }
    };
}

function getOutput(obj) {
    return { technologies: obj };
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
