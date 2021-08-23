import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';
import classNames from 'classnames';
import { AngleLeftIcon, AngleRightIcon } from '@patternfly/react-icons';
import { useRef } from 'react';

const ITEM_WIDTH = 162;
const ITEM_GAP = 24;

const Carousel = ({ children, sections }) => {
  const sectionsCount = sections.filter(
    ({ shape: { section } }) => !!section
  ).length;

  const [touchPosition, setTouchPosition] = useState(null);
  const [maxPages, setMaxPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [maximumTransform, setMaximumTransform] = useState(0);
  const mutables = useRef({});
  const contentObserver = useRef(null);
  /**
   * We need this mutable object to access the values in the observer closure!
   * If we use the hook values, it will only ever contain the initial values.
   */
  mutables.current.prevWidth = 0;
  mutables.current.childrenLength = children.length;
  mutables.current.maxPages = maxPages;
  mutables.current.currentPage = currentPage;
  mutables.current.sectionsCount = sectionsCount;

  const contentRef = useRef(null);
  const computeSlideWidth = (width) => {
    /**
     * Compute maximum amount of pages avaiable on screen
     */
    const contentWidth =
      mutables.current.childrenLength * ITEM_WIDTH +
      (mutables.current.childrenLength - 1) * ITEM_GAP +
      (sectionsCount - 1) * 24;
    const maxPages = Math.ceil(contentWidth / width);
    mutables.current.maxPages = maxPages;
    /**
     * If we end up on empty page, apply last page.
     */
    if (mutables.current.currentPage > maxPages - 1) {
      setCurrentPage(maxPages - 1);
    }
    setMaxPages(maxPages);
    /**
     * compute maximum possible carousel content transformation
     */
    const maximumTransform =
      (maxPages - 2) * 100 + (contentWidth / width - (maxPages - 1)) * 100;
    setMaximumTransform(maximumTransform);
  };

  useEffect(() => {
    if (contentObserver.current) {
      contentObserver.current.disconnect();
    }
    contentObserver.current = new ResizeObserver(() => {
      const realWidth = contentRef.current.getBoundingClientRect().width;
      if (mutables.current.prevWidth !== realWidth) {
        const realWidth = contentRef.current.getBoundingClientRect().width;
        computeSlideWidth(realWidth);
        mutables.current.prevWidth = realWidth;
      }
    });
    contentObserver.current.observe(contentRef.current);

    return () => {
      if (contentObserver.current) {
        contentObserver.current.disconnect();
      }
    };
  }, [children.length]);

  const next = (step = 1) => {
    setCurrentPage((prev) => {
      const next = Math.min(prev + step, maxPages - 1);
      mutables.current.currentPage = next;
      return next;
    });
  };

  const prev = (step = 1) => {
    if (currentPage > 0) {
      setCurrentPage((prev) => {
        mutables.current.currentPage = prev - step;
        return Math.max(prev - step, 0);
      });
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      next(diff / 15);
    }

    if (diff < -5) {
      prev((diff / 15) * -1);
    }

    setTouchPosition(null);
  };

  const pageMarkers = [...Array(maxPages)].map((_, index) => (
    <button
      className={classNames('ins-c-carousel-indicator', {
        active: index === Math.floor(currentPage),
      })}
      key={index}
      onClick={() => setCurrentPage(index)}
    ></button>
  ));

  const gridColumnTemplate = sections
    .map(
      ({ shape: { section } }, index) =>
        `${section?.length && index !== 0 ? ITEM_WIDTH + 24 : ITEM_WIDTH}px`
    )
    .join(' ');

  return (
    <div className="ins-c-carousel-container">
      <div
        className="ins-c-carousel-wrapper"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {currentPage > 0 && (
          <button onClick={() => prev()} className="ins-c-arrow">
            <AngleLeftIcon size="md" />
          </button>
        )}
        <div className="ins-c-carousel-content-wrapper">
          <div
            ref={contentRef}
            className="ins-c-carousel-content"
            style={{
              transform: `translateX(-${Math.min(
                currentPage * 100,
                maximumTransform
              )}%)`,
              'grid-template-columns': gridColumnTemplate,
            }}
          >
            {children}
          </div>
        </div>
        {currentPage < maxPages - 1 && (
          <button onClick={() => next()} className="ins-c-arrow">
            <AngleRightIcon size="md" />
          </button>
        )}
      </div>
      {maxPages > 1 && (
        <div className="ins-c-carousel-indicator-wrapper">{pageMarkers}</div>
      )}
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.node,
  sections: PropTypes.array,
};

export default Carousel;
