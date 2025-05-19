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
import { Provider } from 'react-redux';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';
import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { Middleware } from 'redux';
import { useNavigate } from 'react-router-dom';
import logger from 'redux-logger';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let registry: ReducerRegistry<any>;

export function init(...middleware: Middleware[]) {
  registry = getRegistry({}, [promiseMiddleware, ...middleware]);
  return registry;
}

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
        (user) => user && setIsOrgAdmin(!!user?.identity?.user?.is_org_admin)
      );
  }, []);

  useEffect(() => {
    const unregister = on('APP_NAVIGATION', (event) =>
      navigate(`/${event.navId}`)
    );
    return () => {
      unregister?.();
    };
  }, []);

  return (
    <Provider
      store={init(
        ...(process.env.NODE_ENV !== 'production' ? [logger] : [])
      ).getStore()}
    >
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
    </Provider>
  );
};

export default App;
