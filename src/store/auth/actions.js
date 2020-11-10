import * as auth from './types';

export const loginRequest = (payload) => ({ type: auth.LOGIN_REQUEST, payload });
export const loginSuccess = (payload) => ({ type: auth.LOGIN_SUCCESS, payload });
export const loginFail = (payload) => ({ type: auth.LOGIN_FAIL, payload });

export const logoutRequest = () => ({ type: auth.LOGOUT_REQUEST });
export const logoutSuccess = (payload) => ({ type: auth.LOGOUT_SUCCESS, payload });
export const logoutFail = (payload) => ({ type: auth.LOGOUT_FAIL, payload });

export const clearAuth = (payload) => ({ type: auth.CLEAR_AUTH, payload });