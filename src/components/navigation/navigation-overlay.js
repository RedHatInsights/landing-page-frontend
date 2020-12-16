import React, { useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import NavigationContext from './navigation-context';
import './navigation-overlay.scss';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Divider,
  SplitItem,
  Text,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { SET_ACTIVE_SECTION } from './navigation-reducer';

const computeStyle = (navElement, contentElement) => {
  const { y } = navElement.getBoundingClientRect();
  const { height } = contentElement.getBoundingClientRect();
  const clientHeight = document.documentElement.clientHeight;

  /**
   * Catch if overflow is higher than client.
   * If it true, set the heign to match the client and add scrollbar overflow property.
   */
  if (height > clientHeight) {
    return {
      height: clientHeight,
      overflow: 'auto',
      top: 0,
    };
  }
  /**
   * Catch if the overlay would overflow the current client height.
   * Align it to the bottom of the screen.
   */
  if (y + height > clientHeight) {
    return {
      bottom: -1,
    };
  }

  /**
   * Align the overflow top edge to corresponding link edge.
   */
  return {
    top: y - 1,
  };
};

const OverlayContent = ({ activeSection, handleCloseOverlay, activeRef }) => {
  const contentRef = useRef(null);
  const [style, setStyle] = useState({});
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
  /**
   * Get the Y position of the overlay
   */
  useEffect(() => {
    const resizePopoverHandler = () => {
      setStyle(computeStyle(activeRef.current, contentRef.current));
    };
    window.addEventListener('resize', resizePopoverHandler);
    setStyle(computeStyle(activeRef.current, contentRef.current));
    return () => {
      window.removeEventListener('resize', resizePopoverHandler);
    };
  }, [activeRef.current, contentRef.current]);
  return (
    <div className="ins-c-navigation-overlay" style={style}>
      {/* PF does not propagate refs to the Split component */}
      <div
        ref={contentRef}
        className="pf-l-split pf-m-gutter ins-c-navigation-overlay__content pf-u-p-md"
      >
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
      </div>
    </div>
  );
};

OverlayContent.propTypes = {
  activeSection: PropTypes.string.isRequired,
  handleCloseOverlay: PropTypes.func.isRequired,
  activeRef: PropTypes.shape({ current: PropTypes.object.isRequired })
    .isRequired,
};

const NavigationOverlay = () => {
  const {
    state: { isOpen, activeSection, activeRef },
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
          activeRef={activeRef}
        />,
        document.body
      )
    : null;
};

export default NavigationOverlay;
