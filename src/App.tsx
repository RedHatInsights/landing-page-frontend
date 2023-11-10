import React, {
  Suspense,
  createContext,
  lazy,
  useEffect,
  useState,
} from 'react';
import '@patternfly/patternfly/utilities/Text/text.css';
import { Route, Routes } from 'react-router-dom';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { Bullseye } from '@patternfly/react-core/dist/dynamic/layouts/Bullseye';
import { Spinner } from '@patternfly/react-core/dist/dynamic/components/Spinner';

const Landing = lazy(
  () => import(/* webpackCunkName: "Landing" */ './routes/Landing')
);
const Maintenance = lazy(
  () => import(/* webpackCunkName: "Maintenance" */ './routes/Maintenance')
);
const NotFound = lazy(
  () => import(/* webpackCunkName: "NotFound" */ './routes/404')
);

const routes = {
  landing: '/',
  maintenance: '/maintenance',
};

export const PermissionContext = createContext<{
  isOrgAdmin?: boolean;
}>({});

const App = () => {
  const [isOrgAdmin, setIsOrgAdmin] = useState<boolean>(false);
  const chrome = useChrome();

  chrome?.updateDocumentTitle?.('Hybrid Cloud Console Home', false);

  useEffect(() => {
    chrome.auth
      .getUser()
      .then(
        (user) => user && setIsOrgAdmin(!!user?.identity?.user?.is_org_admin)
      );
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
        <Routes>
          <Route path={routes.landing} element={<Landing />} />
          <Route path={routes.maintenance} element={<Maintenance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PermissionContext.Provider>
  );
};

export default App;
