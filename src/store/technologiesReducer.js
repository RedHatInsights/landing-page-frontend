import { applyReducerHash } from '@red-hat-insights/insights-frontend-components/Utilities/ReducerRegistry';
import { TECHOLOGIES } from './action-types';

export function technologiesLoaded(state, { payload }) {
    return {
        ...state,
        activeTechnologies: payload
    };
}

export default applyReducerHash({
    [TECHOLOGIES]: technologiesLoaded
}, { loaded: true, activeTechnologies: []});
