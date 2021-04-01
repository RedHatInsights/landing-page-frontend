import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { LOAD_DATA, REMOVE_ESTATE_TILE } from './action-types';

/**
 * This is here temporarily to quickly store and use content data before we optimize and split it
 */
export function loadAllContent(
  state,
  { payload: { estate, recommendations, configTryLearn } }
) {
  return {
    ...state,
    estate,
    recommendations,
    configTryLearn,
  };
}

export function removeEstateTile(state, { payload }) {
  return {
    ...state,
    estate: state.estate.map(({ items, ...rest }) => ({
      ...rest,
      items: items.filter(({ id }) => id !== payload),
    })),
  };
}

export default applyReducerHash(
  {
    [LOAD_DATA]: loadAllContent,
    [REMOVE_ESTATE_TILE]: removeEstateTile,
  },
  {
    loaded: false,
    estate: [],
    recommendations: [],
    configTryLearn: [],
  }
);
