import { technologiesLoaded } from '../technologiesReducer';

it('TechnologiesLoaded to return correct data', () => {
    expect(technologiesLoaded({}, { payload: 'some-test' })).toMatchObject({ activeTechnologies: 'some-test' });
});
