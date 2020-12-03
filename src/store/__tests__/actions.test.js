import { technologiesLoaded } from '../actions';

test('should fire correct action', () => {
  expect(technologiesLoaded('some')).toMatchObject({
    type: 'TECHNOLOGIES',
    payload: 'some',
  });
});
