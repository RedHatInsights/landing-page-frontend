import { TECHOLOGIES, MARKETINGTECHNOLOGIES } from './action-types';

export const technologiesLoaded = (data) => ({
    type: TECHOLOGIES,
    payload: data
});

export const marketingTechnologiesLoaded = (data) => ({
    type: MARKETINGTECHNOLOGIES,
    payload: data
});