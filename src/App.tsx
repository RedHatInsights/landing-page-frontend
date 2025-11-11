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
import { useNavigate } from 'react-router-dom';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';

const Landing = lazy(
  () => import(/* webpackCunkName: "Landing" */ './routes/Landing'),
);
const Maintenance = lazy(
  () => import(/* webpackCunkName: "Maintenance" */ './routes/Maintenance'),
);
const NotFound = lazy(
  () => import(/* webpackCunkName: "NotFound" */ './routes/404'),
);

const routes = {
  landing: '/',
  maintenance: '/maintenance',
};

export const PermissionContext = createContext<{
  isOrgAdmin?: boolean;
}>({});

const App: React.FC<{ layoutType?: string }> = ({ layoutType }) => {
  const [isOrgAdmin, setIsOrgAdmin] = useState<boolean>(false);
  const chrome = useChrome();
  const navigate = useNavigate();
  const { on } = useChrome();

  chrome?.updateDocumentTitle?.('Hybrid Cloud Console Home', false);

  useEffect(() => {
    chrome.auth
      .getUser()
      .then(
        (user) => user && setIsOrgAdmin(!!user?.identity?.user?.is_org_admin),
      );
  }, []);

  useEffect(() => {
    const unregister = on('APP_NAVIGATION', (event) =>
      navigate(`/${event.navId}`),
    );
    return () => {
      unregister?.();
    };
  }, []);

  return (
    <PermissionContext.Provider value={{ isOrgAdmin }}>
      <NotificationsProvider />
      <Suspense
        fallback={
          <Bullseye>
            <Spinner size="xl" />
          </Bullseye>
        }
      >
        <Routes>
          <Route
            path={routes.landing}
            element={<Landing layoutType={layoutType} />}
          />
          <Route path={routes.maintenance} element={<Maintenance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PermissionContext.Provider>
  );
};

export default App;
