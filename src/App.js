import React, {
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
} from 'react';
import '@patternfly/patternfly/utilities/Text/text.css';
import { Switch, Route } from 'react-router-dom';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { IntlProvider } from 'react-intl';
import contentStore from './store/contentReducer';

const Landing = lazy(() =>
  import(/* webpackCunkName: "Landing" */ './routes/Landing')
);
const Maintenance = lazy(() =>
  import(/* webpackCunkName: "Maintenance" */ './routes/Maintenance')
);
const NotFound = lazy(() =>
  import(/* webpackCunkName: "NotFound" */ './routes/404')
);

const routes = {
  landing: '/',
  maintenance: '/maintenance',
};

export const PermissionContext = createContext();

const App = () => {
  const [isOrgAdmin, setIsOrgAdmin] = useState();

  useEffect(() => {
    getRegistry().register({ contentStore });
    insights.chrome.init();
    insights.chrome.identifyApp('landing');
    window.insights.chrome.auth
      .getUser()
      .then((user) => user && setIsOrgAdmin(user.identity.user.is_org_admin));
  }, []);

  return (
    <IntlProvider locale="en">
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
    </IntlProvider>
  );
};

export default App;
