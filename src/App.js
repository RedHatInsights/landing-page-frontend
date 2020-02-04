import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { getRegistry } from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import { connect } from 'react-redux';
import NotFound from './routes/404';
import Landing from './routes/Landing';
import technologiesReducer from './store/technologiesReducer';
import marketingTechnologiesReducer from './store/technologiesReducer';
import { technologiesLoaded, marketingTechnologiesLoaded } from './store/actions';
import { activeTechnologies } from './consts/technologies';
import { marketingTechnologies } from './consts/marketing';

const routes = {
    landing: '/'
};

const App = ({ loadTechnologies, loadMarketingTechnologies }) => {
    useEffect(() => {
        getRegistry().register({
            technologies: technologiesReducer,
            marketingTechnologies: marketingTechnologiesReducer
        });
        loadTechnologies(activeTechnologies);
        loadMarketingTechnologies(marketingTechnologies);
        insights.chrome.init();
        insights.chrome.identifyApp('landing');
    });

    return (
        <Switch>
            <Route exact path={ routes.landing } component={ Landing } />
            <Route exact path={ routes.landingBeta } component={ Landing } />
            <Route path="*" component={ NotFound } />
        </Switch>
    );
};

App.propTypes = {
    history: PropTypes.object,
    loadTechnologies: PropTypes.func,
    loadMarketingTechnologies: PropTypes.func
};

App.defaultProps = {
    loadTechnologies: () => undefined,
    loadMarketingTechnologies: () => undefined
};

export default withRouter(connect(null, (dispatch) => ({
    loadTechnologies: (technologies) => dispatch(technologiesLoaded(technologies)),
    loadMarketingTechnologies: (marketingTechnologies) => dispatch(marketingTechnologiesLoaded(marketingTechnologies))
}))(App));
