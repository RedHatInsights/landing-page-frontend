import {
  TECHOLOGIES,
  CALCULATE_ENDPOINTS,
  LOAD_CAROUSEL,
  LOAD_SECTIONS,
  LOAD_DATA,
  REMOVE_ESTATE_TILE,
} from './action-types';
import { endpoints, carousel, sections } from '../utils/config.json';
import { calculateEndpoints } from '../utils/content-generator';

export const technologiesLoaded = (data) => ({
  type: TECHOLOGIES,
  payload: data,
});

export const loadEndpoints = () => ({
  type: CALCULATE_ENDPOINTS,
  payload: calculateEndpoints(endpoints),
});

export const loadCarousel = () => ({
  type: LOAD_CAROUSEL,
  payload: carousel,
});

export const loadSections = () => ({
  type: LOAD_SECTIONS,
  payload: sections,
});

export const loadData = (data) => ({
  type: LOAD_DATA,
  payload: data,
});

export const removeEstateTile = (tileId) => ({
  type: REMOVE_ESTATE_TILE,
  payload: tileId,
});
