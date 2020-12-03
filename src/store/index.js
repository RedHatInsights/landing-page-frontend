import MiddlewareListener from '@redhat-cloud-services/frontend-components-utilities/files/cjs/MiddlewareListener';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/files/cjs/Registry';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/cjs/notificationsMiddleware';
import notifications from '@redhat-cloud-services/frontend-components-notifications/cjs/notifications';
import promiseMiddleware from 'redux-promise-middleware';

let middlewareListener;
let registry;

export function init(...middleware) {
    middlewareListener = new MiddlewareListener();
    registry = getRegistry({}, [
        middlewareListener.getMiddleware(),
        promiseMiddleware,
        notificationsMiddleware(),
        ...middleware.filter(item => typeof item === 'function')
    ]);

    registry.register({ notifications });
    return registry;
}

export function addNewListener({ actionType, callback }) {
    return middlewareListener.addNew({
        on: actionType,
        callback
    });
}
