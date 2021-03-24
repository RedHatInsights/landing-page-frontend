import MiddlewareListener from '@redhat-cloud-services/frontend-components-utilities/MiddlewareListener';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import promiseMiddleware from 'redux-promise-middleware';

let middlewareListener;
let registry;

export function init(...middleware) {
  middlewareListener = new MiddlewareListener();
  registry = getRegistry({}, [
    middlewareListener.getMiddleware(),
    promiseMiddleware,
    notificationsMiddleware(),
    ...middleware.filter((item) => typeof item === 'function'),
  ]);

  registry.register({ notifications: notificationsReducer });
  return registry;
}

export function addNewListener({ actionType, callback }) {
  return middlewareListener.addNew({
    on: actionType,
    callback,
  });
}
