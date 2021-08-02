import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';
import classNames from 'classnames';
import { AngleLeftIcon, AngleRightIcon } from '@patternfly/react-icons';

const Carousel = ({ children, show }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length);
    if (children.length > currentIndex - 1) {
      setCurrentIndex(0);
    }
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => {
        const result = prevState + show;
        return result > children.length ? children.length : result;
      });
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => {
        const result = prevState - show;
        return result > 0 ? result : 0;
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

  const pageMarkers = () =>
    [...Array(Math.floor(children.length / show))].map((_, index) => (
      <button
        className={classNames('ins-c-carousel-indicator', {
          active: index * show === currentIndex,
        })}
        key={index}
        onClick={() => setCurrentIndex(index * show)}
      >

      </button>
    ));
  return (
    <div className="ins-c-carousel-container">
      <div
        className="ins-c-carousel-wrapper"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        
        <button onClick={prev} className="ins-c-arrow">
          {currentIndex > 0 && (
            <AngleLeftIcon size="lg" />
          )}
        </button>
        <div className="ins-c-carousel-content-wrapper">
          <div
            className={`ins-c-carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              'grid-template-columns': `repeat(${children.length}, calc(100% / ${show}))`,
            }}
          >
            {children}
          </div>
        </div>
        <button onClick={next} className="ins-c-arrow">
          {currentIndex < length - show && (
            <AngleRightIcon size="lg" />
          )}
        </button>
      </div>
      <div className="ins-c-carousel-indicator-wrapper">{pageMarkers()}</div>
    </div>
  );
};

Carousel.defaultProps = {
  show: 1,
};

Carousel.propTypes = {
  children: PropTypes.node,
  show: PropTypes.number,
};

export default Carousel;
