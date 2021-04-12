import conditionProcessor from '../condition-processor';

describe('conditionProcessor', () => {
  const data = { nested: { level: 1 }, x: '1' };
  let condition;

  it('and nested condition is true', () => {
    condition = {
      when: 'nested.level',
      is: 1,
    };
    expect(conditionProcessor(data, condition)).toEqual(true);
  });

  it('and not-nested condition is true', () => {
    condition = {
      when: 'x',
      is: '1',
    };
    expect(conditionProcessor(data, condition)).toEqual(true);
  });

  it('and condition is false', () => {
    condition = {
      when: 'nested.level',
      is: 0,
    };
    expect(conditionProcessor(data, condition)).toEqual(false);
  });

  describe('isNot condition', () => {
    test('should fail if values are equal', () => {
      condition = {
        when: 'nested.level',
        isNot: 1,
      };
      expect(conditionProcessor(data, condition)).toEqual(false);
    });

    test('should pass if values are not equal', () => {
      condition = {
        when: 'nested.level',
        isNot: 0,
      };
      expect(conditionProcessor(data, condition)).toEqual(true);
    });
  });
});
