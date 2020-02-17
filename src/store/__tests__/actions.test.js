import { technologiesLoaded, marketingTechnologiesLoaded } from '../actions';

test('should fire correct action', () => {
    expect(technologiesLoaded('some')).toMatchObject({
        type: 'TECHNOLOGIES',
        payload: 'some'
    });
});

test('should fire correct action', () => {
    expect(marketingTechnologiesLoaded('some')).toMatchObject({
        type: 'MARKETINGTECHNOLOGIES',
        payload: 'some'
    });
});
