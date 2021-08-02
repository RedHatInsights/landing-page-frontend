import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.scss';

const Carousel = ({ children, show }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length);
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

  return (
    <div className="ins-c-carousel-container">
      <div
        className="ins-c-carousel-wrapper"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {/** Arrow left */}
        {currentIndex > 0 && (
          <button onClick={prev} className="ins-c-left-arrow">
            &lt;
          </button>
        )}
        <div className="ins-c-carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              'grid-template-columns': `repeat(${children.length}, calc(100% / ${show}))`,
            }}
          >
            {children}
          </div>
        </div>
        {/** Arrow right */}
        {currentIndex < length - show && (
          <button onClick={next} className="ins-c-right-arrow">
            &gt;
          </button>
        )}
      </div>
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
