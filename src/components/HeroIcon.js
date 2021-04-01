import React from 'react';
import PropTypes from 'prop-types';
import './HeroIcon.scss';

const HeroIcon = ({ src, alt }) => (
  <div className="ins-c-hero__title-icon">
    <img src={src} alt={alt} aria-hidden="true" />
  </div>
);

HeroIcon.propTypes = {
  src: PropTypes.any.isRequired,
  alt: PropTypes.string,
};

export default HeroIcon;
