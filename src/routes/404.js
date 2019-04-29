import React from 'react';
import PropTypes from 'prop-types';
import { Main } from '@red-hat-insights/insights-frontend-components';
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
import { withRouter } from 'react-router-dom';

const onButtonClick = (url) => {
    window.location.href = `./${url}`;
};

const NotFound = ({ technologies, history }) => (
    <Main>
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
                onClick={ () => history.push('/') }
            >
                Landing page
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
    </Main>
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

export default withRouter(connect(mapStateToProps)(NotFound));
