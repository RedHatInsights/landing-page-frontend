import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import { ArrowRightIcon } from '@patternfly/react-icons';

import './FancyLink.scss';

const FancyLink = ({ to, children, className, ...props }) => {
    return (
        <a className={ classnames('ins-c-link__fancy', className) } href={ to } { ...props }>{ children }<ArrowRightIcon/></a>
    );
};

export default FancyLink;

FancyLink.propTypes = {
    to: propTypes.string,
    className: propTypes.string,
    children: propTypes.any
};
