import get from 'lodash/get';

const conditionProcessor = (data, condition) => {
  const value = get(data, condition.when);
  if (Object.prototype.hasOwnProperty.call(condition, 'isNot')) {
    return value !== condition.isNot;
  }

  return value === condition.is;
};

export default conditionProcessor;
