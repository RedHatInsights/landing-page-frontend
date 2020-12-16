import React, { useContext, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavItem } from '@patternfly/react-core';
import classnames from 'classnames';
import NavigationContext from './navigation-context';
import { SET_ACTIVE_SECTION } from '.';

import './navigation-item.scss';

// eslint-disable-next-line react/display-name
const NavigationItem = memo(
  ({ title, url, isFocused, handlePopoverTrigger }) => {
    const ref = useRef();
    return (
      <NavItem
        to={`/${url}`}
        id={url}
        component={({ children, className, ...props }) => (
          <a
            {...props}
            onMouseEnter={() => {
              handlePopoverTrigger();
            }}
            onFocus={() => {
              handlePopoverTrigger();
              /**
               * Focus event has to be put on the end of the vene que to prevet "double focus requirement".
               * Witouth this, user will have to double tap "tab" to focus the next element and the link won't be
               * focused properly on shift+tab focus switch (async react rendering caused by context).
               */
              setTimeout(() => {
                ref.current.focus();
              });
            }}
            onBlur={() => {
              handlePopoverTrigger(false);
            }}
            ref={ref}
            className={classnames(className, {
              'ins-c-navigation-item__active': isFocused,
            })}
          >
            {children}
          </a>
        )}
      >
        {title}
      </NavItem>
    );
  },
  (prevProps, nextProps) => prevProps.isFocused === nextProps.isFocused
);

NavigationItem.propTypes = {
  title: PropTypes.string.state,
  url: PropTypes.string.isRequired,
  isFocused: PropTypes.bool,
  id: PropTypes.string.isRequired,
  handlePopoverTrigger: PropTypes.func.isRequired,
};

const NavigationItemConnector = (props) => {
  const {
    state: { activeSection },
    internalDispatch,
  } = useContext(NavigationContext);
  const handlePopoverTrigger = (isOpen = true) => {
    internalDispatch({
      type: SET_ACTIVE_SECTION,
      activeSection: isOpen ? props.id : undefined,
      isOpen,
    });
  };
  return (
    <NavigationItem
      {...props}
      handlePopoverTrigger={handlePopoverTrigger}
      isFocused={activeSection === props.id}
    />
  );
};

NavigationItemConnector.propTypes = {
  id: PropTypes.string.isRequired,
};

export default memo(NavigationItemConnector, () => true);
