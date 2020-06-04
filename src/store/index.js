import MiddlewareListener from '@red-hat-insights/insights-frontend-components/Utilities/MiddlewareListener';
import { getRegistry } from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import { notificationsMiddleware, notifications } from '@redhat-cloud-services/frontend-components-notifications';
import promiseMiddleware from 'redux-promise-middleware';

let middlewareListener;
let registry;

export function init(...middleware) {
    middlewareListener = new MiddlewareListener();
    registry = getRegistry({}, [
        middlewareListener.getMiddleware(),
        promiseMiddleware,
        notificationsMiddleware(),
        ...middleware
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
