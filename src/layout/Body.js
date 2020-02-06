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
            activeTabKey: 0
        };

        // Toggle currently active tab
        this.handleTabClick = (event, tabIndex) => {
            this.setState({
                activeTabKey: tabIndex
            });
        };
    }

    render() {

        return (
            <React.Fragment>
                <Hero title='Manage, automate, and optimize your IT' className='ins-c-hero__small'/>
                <PageSection className='pf-m-fill ins-p-landing__content'>
                    <Tabs activeKey={ this.state.activeTabKey } isSecondary onSelect={ this.handleTabClick }>
                        { this.props.technologies.map(({ title, description, image, apps }, key) => ( // eslint-disable-line max-len
                            <Tab key={ key }
                                eventKey={ key || 0 }
                                title={ <BannerCard title={ title } description={ description } image={ image }/> }>
                                <div className='ins-l-app-grid'>
                                    { apps.map(({ name, url }, key) => ( // eslint-disable-line max-len
                                        <FancyLink
                                            className='ins-l-app-grid__item'
                                            to={ `${window.location.origin}${window.insights.chrome.isBeta() ? '/beta/' : '/'}${url}` }
                                            key={ key }>
                                            { name }
                                        </FancyLink>
                                    )) }
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
