import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import NavigationContext from './navigation-context';
import './navigation-overlay.scss';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Divider,
  Split,
  SplitItem,
  Text,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { SET_ACTIVE_SECTION } from './navigation-reducer';

const OverlayContent = ({ activeSection, handleCloseOverlay }) => {
  const technology = useSelector(({ technologies }) =>
    technologies?.activeTechnologies.find(
      ({ id }) => id === activeSection,
      shallowEqual
    )
  );
  useEffect(() => {
    /**
     * store the reference in case the functions is mutated
     */
    const eventHandler = handleCloseOverlay;
    document.addEventListener('click', eventHandler);
    return () => {
      eventHandler();
      document.removeEventListener('click', eventHandler);
    };
  }, []);
  return (
    <div className="ins-c-navigation-overlay">
      <Split hasGutter className="ins-c-navigation-overlay__content pf-u-p-md">
        <SplitItem className="pf-u-mr-lg">
          <Stack hasGutter>
            <StackItem>
              <Text>By application</Text>
            </StackItem>
            {technology.apps
              ? Object.entries(technology.apps).map(([title, link]) => (
                  <StackItem key={title}>
                    <a
                      className="ins-c-navigation-overlay__link"
                      href={`/${technology.url}${link}`}
                    >
                      {title}
                    </a>
                  </StackItem>
                ))
              : 'foo'}
          </Stack>
        </SplitItem>
        <SplitItem className="pf-u-mr-lg">
          <Text>By featured use case</Text>
          <Text>Where to get this content?</Text>
        </SplitItem>
        <SplitItem className="pf-u-mr-lg">
          <Divider isVertical />
        </SplitItem>
        <SplitItem>
          <Text>Where to get this content?</Text>
          <Text>Technical resource</Text>
        </SplitItem>
      </Split>
    </div>
  );
};

OverlayContent.propTypes = {
  activeSection: PropTypes.string.isRequired,
  handleCloseOverlay: PropTypes.func.isRequired,
};

const NavigationOverlay = () => {
  const {
    state: { isOpen, activeSection },
    internalDispatch,
  } = useContext(NavigationContext);
  const handleCloseOverlay = () =>
    internalDispatch({
      type: SET_ACTIVE_SECTION,
      activeSection: undefined,
      isOpen: false,
    });
  return isOpen
    ? createPortal(
        <OverlayContent
          handleCloseOverlay={handleCloseOverlay}
          activeSection={activeSection}
        />,
        document.body
      )
    : null;
};

export default NavigationOverlay;
