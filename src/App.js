import React, {
  Suspense,
  createContext,
  lazy,
  useEffect,
  useState,
} from 'react';
import '@patternfly/patternfly/utilities/Text/text.css';
import { Route, Routes } from 'react-router-dom';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
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
  const chrome = useChrome();

  useEffect(() => {
    getRegistry().register({ contentStore });
    chrome.auth
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
          <Routes>
            <Route path={routes.landing} element={<Landing />} />
            <Route path={routes.maintenance} element={<Maintenance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PermissionContext.Provider>
    </IntlProvider>
  );
};

export default App;
