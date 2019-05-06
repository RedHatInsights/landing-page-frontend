import React from 'react';
import PropTypes from 'prop-types';
import Icon404 from '../components/icon-404';
import {
    Title,
    Button
} from '@patternfly/react-core';
import { connect } from 'react-redux';

import './404.scss';

const onButtonClick = (url) => {
    window.location.href = `./${url}`;
};

const NotFound = () => (
        <section className="pf-l-page__main-section pf-c-page__main-section ins-c-page__404">
            <Title size='3xl'> 404: It's true. We've lost it. </Title>
            <Icon404/>
            <Title size='xl' className='ins-c-text__sorry'>
                Sorry, we couldn't find what you were looking for.
                The page you requested may have been changed or moved.
            </Title>
            <Button
                variant="primary"
                onClick={ () => onButtonClick('') }>
                    Return to homepage
            </Button>
        </section>
);

NotFound.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string
    })),
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

NotFound.defaultProps = {
    technologies: [],
    history: {
        push: () => undefined
    }
};

function mapStateToProps({ technologies } = { technologies: { activeTechnologies: []}}) {
    return {
        technologies: technologies && technologies.activeTechnologies.filter(({ disabled }) => !disabled)
    };
}

export default connect(mapStateToProps)(NotFound);
