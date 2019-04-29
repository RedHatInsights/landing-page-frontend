import React from 'react';
import PropTypes from 'prop-types';
import { DungeonIcon } from '@patternfly/react-icons';
import {
    Title,
    EmptyState,
    Button,
    EmptyStateVariant,
    EmptyStateIcon,
    EmptyStateBody,
    EmptyStateSecondaryActions
} from '@patternfly/react-core';
import { connect } from 'react-redux';

const onButtonClick = (url) => {
    window.location.href = `./${url}`;
};

const NotFound = ({ technologies }) => (
    <div>
        <EmptyState variant={ EmptyStateVariant.full }>
            <EmptyStateIcon icon={ DungeonIcon } />
            <Title headingLevel="h5" size="lg">
                    Page not found
            </Title>
            <EmptyStateBody>
                    Looks like you have reached the end of Red Hat Cloud Services.
            </EmptyStateBody>
            <Button
                variant="primary"
                onClick={ () => onButtonClick('') }
            >
                    Take me home
            </Button>
            <EmptyStateSecondaryActions>
                { technologies && technologies.map((technology, key) => (
                    <Button
                        key={ key }
                        variant="link"
                        onClick={ () => onButtonClick(technology.url) }
                    >
                        { technology.title }
                    </Button>
                )) }
            </EmptyStateSecondaryActions>
        </EmptyState>
    </div>
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
