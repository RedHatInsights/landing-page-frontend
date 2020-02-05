import { technologiesLoaded, marketingTechnologiesLoaded } from '../technologiesReducer';

it('TechnologiesLoaded to return correct data', () => {
    expect(technologiesLoaded({}, { payload: 'some-test' })).toMatchObject({ activeTechnologies: 'some-test' });
});

it('marketingTechnologiesLoaded to return correct data', () => {
    expect(marketingTechnologiesLoaded({}, { payload: 'some-test' })).toMatchObject({ marketingTechnologies: 'some-test' });
});
