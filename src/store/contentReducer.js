import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import {
  CALCULATE_ENDPOINTS,
  LOAD_CAROUSEL,
  LOAD_SECTIONS,
  LOAD_DATA,
} from './action-types';
import flatMap from 'lodash/flatMap';

const contentMapper = (endpoints, key) =>
  flatMap(endpoints, ({ actions, api }) =>
    actions?.[key].map((section) => {
      const [appName, version = 'v1'] = api.split('/');
      return {
        ...section,
        api: `/api/${appName}/${version}${
          (section?.api || '').startsWith('/') ? '' : '/'
        }${section?.api || ''}`,
      };
    })
  );

export function endpointsLoaded(state, { payload }) {
  return {
    ...state,
    loaded: true,
    endpoints: payload,
  };
}

export function sectionsLoader(state, { payload }) {
  const sections = contentMapper(state?.endpoints, 'sections');
  payload.forEach((item) => {
    sections.forEach((section) => {
      if (item?.subSections && section.ref.includes('.')) {
        item?.subSections.forEach((subSection) => {
          if (`${item.id}.${subSection.id}` === section.ref) {
            subSection.values = [...(subSection.values || []), section];
          }
        });
      }

      if (item.id === section.ref) {
        item.values = [...(item.values || []), section];
      }
    });
  });
  return {
    ...state,
    sections: payload,
  };
}

export function carouselLoader(state, { payload }) {
  const carousel = contentMapper(state?.endpoints, 'carousel');
  payload.forEach((item) => {
    carousel.forEach((section) => {
      if (item.id === section.ref) {
        item.values = [...(item.values || []), section];
      }
    });
  });
  return {
    ...state,
    carousel: payload,
  };
}

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

export default applyReducerHash(
  {
    [`${CALCULATE_ENDPOINTS}_FULFILLED`]: endpointsLoaded,
    [LOAD_SECTIONS]: sectionsLoader,
    [LOAD_CAROUSEL]: carouselLoader,
    [LOAD_DATA]: loadAllContent,
  },
  {
    loaded: false,
    endpoints: [],
    carousel: [],
    sections: [],
    estate: [],
    recommendations: [],
    configTryLearn: [],
  }
);
