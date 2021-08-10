import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';
import classNames from 'classnames';
import { AngleLeftIcon, AngleRightIcon } from '@patternfly/react-icons';
import { useRef } from 'react';

const ITEM_WIDTH = 160;
const ITEM_GAP = 16;

const Carousel = ({ children }) => {
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

  const contentRef = useRef(null);
  const computeSlideWidth = (width) => {
    /**
     * Compute maximum amount of pages avaiable on screen
     */
    const contentWidth =
      mutables.current.childrenLength * ITEM_WIDTH +
      (mutables.current.childrenLength - 1) * ITEM_GAP;
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

  const next = () => {
    if (currentPage < maxPages) {
      setCurrentPage((prev) => {
        mutables.current.currentPage = prev + 1;
        return prev + 1;
      });
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => {
        mutables.current.currentPage = prev - 1;
        return prev - 1;
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
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  const pageMarkers = [...Array(maxPages)].map((_, index) => (
    <button
      className={classNames('ins-c-carousel-indicator', {
        active: index === currentPage,
      })}
      key={index}
      onClick={() => setCurrentPage(index)}
    ></button>
  ));
  return (
    <div className="ins-c-carousel-container">
      <div
        className="ins-c-carousel-wrapper"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {currentPage > 0 && (
          <button onClick={prev} className="ins-c-arrow">
            <AngleLeftIcon size="lg" />
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
              'grid-template-columns': `repeat(${children.length}, 160px)`,
            }}
          >
            {children}
          </div>
        </div>
        {currentPage < maxPages - 1 && (
          <button onClick={next} className="ins-c-arrow">
            <AngleRightIcon size="lg" />
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
};

export default Carousel;
