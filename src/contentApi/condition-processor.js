import get from 'lodash/get';

const conditionProcessor = (data, condition) => {
  const value = get(data, condition.when);

  return value === condition.is;
};

export default conditionProcessor;
