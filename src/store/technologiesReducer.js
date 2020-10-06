import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/cjs/ReducerRegistry';
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
