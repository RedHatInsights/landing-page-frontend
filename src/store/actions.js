import { TECHOLOGIES } from './action-types';

export const technologiesLoaded = (data) => ({
    type: TECHOLOGIES,
    payload: data
});
