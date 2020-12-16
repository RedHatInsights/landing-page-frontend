import React, { useReducer } from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import { useSelector } from 'react-redux';
import NavigationItem from './navigation-item';

import './navigation.scss';
import NavigationContext from './navigation-context';

export const SET_ACTIVE_SECTION = 'set-active-section';
export const SET_IS_OPEN = 'set-is-open';

const navigationReducer = (state, { type, activeSection, isOpen }) => {
  switch (type) {
    case SET_ACTIVE_SECTION:
      return { ...state, activeSection, isOpen };
    case SET_IS_OPEN:
      return { ...state, isOpen };
  }
  console.warn('Unknow navigationReducer action type: ', type);
  return state;
};

const Navigation = () => {
  const [state, internalDispatch] = useReducer(navigationReducer, {
    isOpen: false,
    activeSection: undefined,
  });
  const loaded = useSelector(({ technologies }) => technologies.loaded);
  const navigationItems = useSelector(({ technologies }) =>
    technologies?.activeTechnologies.filter(({ disabled }) => !disabled)
  );

  if (!loaded) {
    return null;
  }
  console.log({ state });
  return (
    <Nav className="ins-c-navigation">
      <NavList>
        <NavItem preventDefault component="span">
          <b>Red Hat Hybrid Could Console</b>
        </NavItem>
        <NavigationContext.Provider value={{ state, internalDispatch }}>
          {navigationItems.map((item, index) => (
            <NavigationItem key={item.id} tabIndex={index} {...item} />
          ))}
        </NavigationContext.Provider>
      </NavList>
    </Nav>
  );
};

export default Navigation;
