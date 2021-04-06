import { loadAllContent, removeEstateTile } from '../contentReducer';

describe('contentReducer', () => {
  let state;
  let payload;

  beforeEach(() => {
    state = {};
    payload = {};
  });

  it('loadAllContent', () => {
    payload = {
      estate: ['estate1', 'estate2'],
      recommendations: ['recommendations', 'recommendations2'],
      configTryLearn: ['configTryLearn', 'configTryLearn2'],
    };

    expect(loadAllContent(state, { payload })).toEqual(payload);
  });

  it('removeEstateTile', () => {
    const id = 'hhasd64g9';

    state = {
      estate: [
        {
          items: [
            { name: 'estate1', id: '123' },
            { name: 'estate2', id },
            { name: 'estate 3', id: '321' },
          ],
        },
      ],
      recommendations: ['recommendations', 'recommendations2'],
      configTryLearn: ['configTryLearn', 'configTryLearn2'],
    };

    payload = id;

    expect(removeEstateTile(state, { payload })).toEqual({
      estate: [
        {
          items: [
            { name: 'estate1', id: '123' },
            { name: 'estate 3', id: '321' },
          ],
        },
      ],
      recommendations: ['recommendations', 'recommendations2'],
      configTryLearn: ['configTryLearn', 'configTryLearn2'],
    });
  });
});
