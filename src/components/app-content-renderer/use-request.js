import { useEffect, useReducer } from 'react';

import { processRequest } from '../../contentApi/request-processor';

const reducer = (state, payload) => ({ ...state, ...payload });

const useRequest = (data, onResponse, onError) => {
  const [state, setState] = useReducer(reducer, {
    loaded: typeof data.count === 'number',
    count: data.count,
  });

  useEffect(async () => {
    try {
      const response = await processRequest(data);
      setState({ loaded: true, ...response });
      onResponse && onResponse(response, data);
    } catch (e) {
      onError && onError(e, data);
    }
  }, []);

  return [state, setState];
};

export default useRequest;
