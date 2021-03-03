import React, {
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
} from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/files/cjs/Registry';
import { useDispatch } from 'react-redux';
import { Bullseye, Spinner } from '@patternfly/react-core';
import technologiesReducer from './store/technologiesReducer';
import contentStore from './store/contentReducer';
import {
  technologiesLoaded,
  loadEndpoints,
  loadCarousel,
  loadSections,
} from './store/actions';
import { activeTechnologies } from './consts';

const Landing = lazy(() =>
  import(/* webpackCunkName: "Landing" */ './routes/Landing')
);
const Maintenance = lazy(() =>
  import(/* webpackCunkName: "Maintenance" */ './routes/Maintenance')
);
const NotFound = lazy(() =>
  import(/* webpackCunkName: "NotFound" */ './routes/404')
);

import './App.scss';

const routes = {
  landing: '/',
  maintenance: '/maintenance',
};

export const PermissionContext = createContext();

const App = () => {
  const [isOrgAdmin, setIsOrgAdmin] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getRegistry().register({ technologies: technologiesReducer, contentStore });
    dispatch(technologiesLoaded(activeTechnologies));
    const endpointsAction = loadEndpoints();
    dispatch(endpointsAction);
    (async () => {
      await endpointsAction.payload;
      dispatch(loadCarousel());
      dispatch(loadSections());
    })();
    insights.chrome.init();
    insights.chrome.identifyApp('landing');
    window.insights.chrome.auth
      .getUser()
      .then((user) => user && setIsOrgAdmin(user.identity.user.is_org_admin));
  }, []);

  return (
    <PermissionContext.Provider value={{ isOrgAdmin }}>
      <Suspense
        fallback={
          <Bullseye>
            <Spinner size="xl" />
          </Bullseye>
        }
      >
        <Switch>
          <Route exact path={routes.landing} component={Landing} />
          <Route exact path={routes.landingBeta} component={Landing} />
          <Route exact path={routes.maintenance} component={Maintenance} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </PermissionContext.Provider>
  );
};

export default withRouter(App);
