import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getAuth = (state) => state.auth;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getAuth = createSelector(
    [_getAuth],
    (auth) => auth
);

export const getAuthIsAuthenticated = createSelector(
    [getAuth],
    (auth) => auth.isAuthenticated
);

export const getAuthIsLoggingIn = createSelector(
    [getAuth],
    (auth) => auth.isLoggingIn
);

export const getAuthProfile = createSelector(
    [getAuth],
    (auth) => auth.profile
);
