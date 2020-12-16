export const SET_ACTIVE_SECTION = 'set-active-section';
export const SET_IS_OPEN = 'set-is-open';

const navigationReducer = (
  state,
  { type, activeSection, isOpen, activeRef }
) => {
  switch (type) {
    case SET_ACTIVE_SECTION:
      return { ...state, activeSection, isOpen, activeRef };
    case SET_IS_OPEN:
      return { ...state, isOpen };
  }
  console.warn('Unknow navigationReducer action type: ', type);
  return state;
};

export default navigationReducer;
