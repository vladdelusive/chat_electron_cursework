import * as auth from './types';

export const fetchLogInByGoogle = () => ({ type: auth.FETCH_LOGIN_BY_GOOGLE });
export const saveLogInByGoogle = (payload) => ({ type: auth.SAVE_LOGIN_BY_GOOGLE, payload });
export const failLogInByGoogle = (payload) => ({ type: auth.FAIL_LOGIN_BY_GOOGLE, payload });

export const logoutRequest = () => ({ type: auth.LOGOUT_REQUEST });
export const clearAuth = (payload) => ({ type: auth.CLEAR_AUTH, payload });

export const setUpdateProfile = (payload) => ({ type: auth.SET_UPDATE_PROFILE, payload });
export const saveUpdateProfile = (payload) => ({ type: auth.SAVE_UPDATE_PROFILE, payload });

export const fetchRegisterByMailAndPassword = (payload) => ({ type: auth.FETCH_REGISTER_BY_MAIL_AND_PASSWORD, payload });
export const saveRegisterByMailAndPassword = (payload) => ({ type: auth.SAVE_REGISTER_BY_MAIL_AND_PASSWORD, payload });

export const fetchLogInByMailAndPassword = (payload) => ({ type: auth.FETCH_LOGIN_BY_MAIL_AND_PASSWORD, payload });
export const saveLogInByMailAndPassword = (payload) => ({ type: auth.SAVE_LOGIN_BY_MAIL_AND_PASSWORD, payload });