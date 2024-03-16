/**
 * Setup callback for an action
 *
 * @param  {Object}   action Mendix action object
 * @return {Function}        Action callback
 */
export const setupActionCallback = action => {
    if (!action) {
        return null;
    }

    return () => {
        if (action && action.isAuthorized && action.canExecute && !action.isExecuting) {
            action.execute();
        }
    };
};
