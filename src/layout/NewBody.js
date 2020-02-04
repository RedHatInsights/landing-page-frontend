import React from 'react';
import {
    Grid, GridItem,
    PageSection,
    Tabs, Tab, TabsVariant
} from '@patternfly/react-core';

import Hero from '../layout/Hero';
import BannerCard from '../components/BannerCard';
import FancyLink from '../components/FancyLink';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './NewBody.scss';

// TODO Make the cards tabs

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
                    <Tabs activeKey={this.state.activeTabKey} isSecondary onSelect={this.handleTabClick}>
                        { this.props.technologies.map(({ title, description, icon, apps }, key) => ( // eslint-disable-line max-len
                            <Tab eventKey={key || 0} title={ <BannerCard title={title} description={description} icon={icon}/> }>
                                <Grid gutter='sm' className='ins-l-app-grid' xs={12} sm={6} md={3}>
                                { apps.map(({ id, name, url }, key) => ( // eslint-disable-line max-len
                                    <GridItem>
                                        <FancyLink to={`${window.location.href}${url}`} key={key}> {name} </FancyLink>
                                    </GridItem>
                                )) }
                                </Grid>
                            </Tab>
                        )) }
                    </Tabs>
                </PageSection>
            </React.Fragment>
        )
    }
};

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
