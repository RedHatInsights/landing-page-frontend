import { LOAD_DATA, REMOVE_ESTATE_TILE } from './action-types';

export const loadData = (data) => ({
  type: LOAD_DATA,
  payload: data,
});

export const removeEstateTile = (tileId) => ({
  type: REMOVE_ESTATE_TILE,
  payload: tileId,
});
