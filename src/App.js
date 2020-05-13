import PropTypes from 'prop-types';
import React, { useEffect, useState, createContext } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { getRegistry } from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import { connect } from 'react-redux';
import NotFound from './routes/404';
import Landing from './routes/Landing';
import Maintenance from './routes/Maintenance';
import technologiesReducer from './store/technologiesReducer';
import { technologiesLoaded } from './store/actions';
import { activeTechnologies } from './consts';

const routes = {
    landing: '/',
    maintenance: '/maintenance'
};

export const PermissionContext = createContext();

const App = ({ loadTechnologies }) => {

    const [ isOrgAdmin, setIsOrgAdmin ] = useState();

    useEffect(() => {
        getRegistry().register({ technologies: technologiesReducer });
        loadTechnologies(activeTechnologies);
        insights.chrome.init();
        insights.chrome.identifyApp('landing');
        window.insights.chrome.auth.getUser().then((user) => user && setIsOrgAdmin(user.identity.user.is_org_admin));
    });

    return (
        <PermissionContext.Provider value={ { isOrgAdmin } }>
            <Switch>
                <Route exact path={ routes.landing } component={ Landing } />
                <Route exact path={ routes.landingBeta } component={ Landing } />
                <Route exact path={ routes.maintenance } component={ Maintenance } />
                <Route path="*" component={ NotFound } />
            </Switch>
        </PermissionContext.Provider>
    );
};

App.propTypes = {
    history: PropTypes.object,
    loadTechnologies: PropTypes.func
};

App.defaultProps = {
    loadTechnologies: () => undefined
};

export default withRouter(connect(null, (dispatch) => ({
    loadTechnologies: (technologies) => dispatch(technologiesLoaded(technologies))
}))(App));
