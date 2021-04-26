import React from 'react';
import propTypes from 'prop-types';
import './WidthLimiter.scss';

const WidthLimiter = ({ width, children, ...props }) => (
  <div className={`pf-c-width-limiter ${width}`} {...props}>
    {children}
  </div>
);

WidthLimiter.propTypes = {
  children: propTypes.any,
  width: propTypes.string,
  className: propTypes.string,
};

export default WidthLimiter;
