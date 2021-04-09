import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import {
  LOAD_DATA,
  REMOVE_ESTATE_TILE,
  REMOVE_RECOMMENDATION_TILE,
} from './action-types';

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

function removeTileFromSections({ sections = [], ...recommendation }, tileId) {
  return {
    ...recommendation,
    sections: sections.map(({ groups = [], ...section }) => ({
      ...section,
      groups: groups.filter(({ id }) => id !== tileId),
    })),
  };
}

export function removeRecommendationTile(
  state,
  { payload: { tileId, recId } }
) {
  return {
    ...state,
    recommendations: state.recommendations.map((recommendations) =>
      recommendations.id === recId
        ? removeTileFromSections(recommendations, tileId)
        : recommendations
    ),
  };
}

export default applyReducerHash(
  {
    [LOAD_DATA]: loadAllContent,
    [REMOVE_ESTATE_TILE]: removeEstateTile,
    [REMOVE_RECOMMENDATION_TILE]: removeRecommendationTile,
  },
  {
    loaded: false,
    estate: [],
    recommendations: [],
    configTryLearn: [],
  }
);
