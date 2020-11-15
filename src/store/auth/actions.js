import * as auth from './types';

export const fetchLogInByGoogle = () => ({ type: auth.FETCH_LOGIN_BY_GOOGLE });
export const saveLogInByGoogle = (payload) => ({ type: auth.SAVE_LOGIN_BY_GOOGLE, payload });
export const failLogInByGoogle = (payload) => ({ type: auth.FAIL_LOGIN_BY_GOOGLE, payload });

export const logoutRequest = () => ({ type: auth.LOGOUT_REQUEST });
export const clearAuth = (payload) => ({ type: auth.CLEAR_AUTH, payload });