import { createContext } from 'react';

const NavigationContext = createContext({
  state: {
    isOpen: false,
    activeSection: undefined,
  },
  internalDispatch: () => {
    console.warn('no dispatch function has been set in navigation context');
  },
});

export default NavigationContext;
