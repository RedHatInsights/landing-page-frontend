import React from 'react';
import propTypes from 'prop-types';

import {
    Card, CardBody,
    Flex, FlexItem, FlexModifiers,
    Title
} from '@patternfly/react-core';

import './BannerCard.scss';

const BannerCard = ({ image, title, ...props }) => {
    return (
        <Card className='ins-c-banner-card' { ...props }>
            <CardBody>
                <Flex className='pf-m-align-items-center' breakpointMods={ [{ modifier: FlexModifiers.column }] }>
                    <FlexItem className='ins-c-banner-card__icon'>
                        <img
                            aria-hidden
                            src={ image }
                            alt={ `${title} logo` } />
                    </FlexItem>
                    <FlexItem className='ins-c-banner-card__title'><Title headingLevel='h4' size='xl'>{ title }</Title></FlexItem>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default BannerCard;

BannerCard.propTypes = {
    image: propTypes.any,
    title: propTypes.string,
    description: propTypes.string
};
