import React from 'react';
import propTypes from 'prop-types';

import { ArrowRightIcon } from '@patternfly/react-icons';

import './FancyLink.scss';

const FancyLink = ({ to, children, ...props }) => {
    return (
        <a className='ins-c-link__fancy' href={to} {...props}>{children}<ArrowRightIcon/></a>
    );
};

export default FancyLink;

FancyLink.propTypes = {
    to: propTypes.string,
    children: propTypes.any,
};
