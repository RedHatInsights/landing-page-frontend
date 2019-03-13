import { applyReducerHash } from '@red-hat-insights/insights-frontend-components/Utilities/ReducerRegistry';
import { TECHOLOGIES } from './action-types';

function technologiesLoaded(state, { payload }) {
    return {
        ...state,
        aciveTechnologies: payload
    };
}

export default applyReducerHash({
    [TECHOLOGIES]: technologiesLoaded
}, { loaded: true });
