import React, { useEffect, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import EstateRenderer from './estate-renderer';

const flattenSections = (estates) =>
  estates
    /**Give the first item in specific section correct title */
    .map(({ section, items }) =>
      items.map((item, index) =>
        index === 0
          ? {
              ...item,
              shape: {
                ...item.shape,
                section,
              },
            }
          : item
      )
    )
    /** Flatten the array */
    .flat()
    /** Filter out items that do not have id */
    .filter(({ id, ...tile }) => {
      const result = !!id;
      if (!result) {
        console.error(
          `Estate tile ${JSON.stringify(
            tile
          )} does not have required attribute "id" and is excluded`
        );
      }
      return result;
    });

const scrollhandler = (event, element) => {
  /**
   * allow verticall scroll if we can't scroll to the right or left anymore
   */
  if (
    (element.scrollWidth - element.offsetWidth - element.scrollLeft === 0 &&
      event.deltaY >= 0) ||
    (element.scrollLeft === 0 && event.deltaY <= 0)
  ) {
    return;
  }
  /**
   * Stop vertical scroll
   */
  event.preventDefault();
  element.scrollLeft += event.deltaY;
};

const FirstPanel = () => {
  const scrollRef = useRef(null);
  const estate = useSelector(
    ({ contentStore: { estate } }) => estate,
    shallowEqual
  );

  useEffect(() => {
    const wheelHandler = (event) => scrollhandler(event, scrollRef.current);
    scrollRef?.current?.addEventListener('wheel', wheelHandler);
    return () => {
      scrollRef?.current?.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  const flatSections = flattenSections(estate || []);
  return flatSections.length > 0 ? (
    <div ref={scrollRef} className="land-l-first-panel">
      <EstateRenderer sections={flatSections} />
    </div>
  ) : null;
};

export default FirstPanel;
