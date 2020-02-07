import React from 'react';
import {
    PageSection,
    Tabs, Tab
} from '@patternfly/react-core';

import Hero from './Hero';
import BannerCard from '../components/BannerCard';
import FancyLink from '../components/FancyLink';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Body.scss';

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 0 // always start in the first category
        };

        // Toggle currently active tab
        this.handleTabClick = (event, tabIndex) => {
            this.setState({ activeTabKey: tabIndex });
        };
    }

    render() {
        return (
            <React.Fragment>
                <Hero title='Manage, automate, and optimize your IT' className='ins-c-hero__small' data-ouia-component-type='hero'/>
                <PageSection className='pf-m-fill ins-p-landing__content'>
                    <Tabs data-ouia-navigation='true' activeKey={ this.state.activeTabKey } isSecondary onSelect={ this.handleTabClick }>
                        { this.props.technologies.map(({ title, id, description, image, apps }, key) => ( // map categories
                            <Tab key={ key }
                                data-ouia-component-type='tab'
                                data-ouia-component-id={`nav-tab-${id}`}
                                data-ouia-navigation-name={`Tab ${id}`}
                                eventKey={ key || 0 }
                                title={ <BannerCard title={ title } category-id={ id } description={ description } image={ image }/> }>
                                <div className='ins-l-app-grid'>
                                    { apps.map(({ name, url, id, disabled }, key) => { // map out individual apps inside categories
                                        return !disabled && <FancyLink
                                            className='ins-l-app-grid__item'
                                            data-ouia-component-type='app-link'
                                            data-ouia-component-id={`app-link-${id}`}
                                            application-id={ id }
                                            to={ `${window.location.origin}${window.insights.chrome.isBeta() ? '/beta/' : '/'}${url}` }
                                            key={ key }>
                                            { name }
                                        </FancyLink>;
                                    }) }
                                </div>
                            </Tab>
                        )) }
                    </Tabs>
                </PageSection>
            </React.Fragment>
        );
    }
}

Body.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        apps: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            url: PropTypes.string
        }))
    }))
};

Body.defaultProps = {
    technologies: []
};

function mapStateToProps({ technologies } = { technologies: { activeTechnologies: []}}) {
    return {
        technologies: technologies && technologies.activeTechnologies.filter(({ disabled }) => !disabled)
    };
}

export { mapStateToProps };
export default connect(mapStateToProps)(Body);
