import { applyReducerHash } from '@red-hat-insights/insights-frontend-components/Utilities/ReducerRegistry';
import { TECHOLOGIES, MARKETINGTECHNOLOGIES } from './action-types';

export function technologiesLoaded(state, { payload }) {
    return {
        ...state,
        activeTechnologies: payload
    };
}

export function marketingTechnologiesLoaded(state, { payload }) {
    return {
        ...state,
        marketingTechnologies: payload
    };
}

export default applyReducerHash({
    [TECHOLOGIES]: technologiesLoaded,
    [MARKETINGTECHNOLOGIES]: marketingTechnologiesLoaded
}, { loaded: true, activeTechnologies: [], marketingTechnologies: []});
