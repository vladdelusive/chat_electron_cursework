import { createReducer } from 'store/utils';
import * as auth from './types';

const initialState = {
    isAuthenticated: false,
    isLoggingIn: false,
    profile: null,
};

export const authReducer = createReducer(initialState, {
    [auth.LOGIN_REQUEST](state) {
        return {
            ...state,
            isLoggingIn: true
        };
    },

    [auth.LOGIN_SUCCESS](state, action) {
        const { payload } = action;
        return {
            ...state,
            isLoggingIn: false,
            isAuthenticated: true,
            profile: payload,
        };
    },

    [auth.LOGIN_FAIL](state) {
        return {
            ...state,
            isLoggingIn: false,
        };
    },

    [auth.CLEAR_AUTH]() {
        return initialState;
    },
});
