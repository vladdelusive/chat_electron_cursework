import { call, put, takeEvery } from 'redux-saga/effects';
import * as auth from './types';
import {
    saveLogInByGoogle,
    failLogInByGoogle,
} from './actions';
import { api } from 'services';
import { push } from 'connected-react-router';
import { routes } from 'routes';
import { saveChats } from 'store/chats/actions';

// const saveProfileToLocalStorage = (auth) => window.localStorage.setItem("auth", auth);
// const removeProfileToLocalStorage = () => window.localStorage.removeItem("auth");

function* fetchLogInByGoogleSaga() {
    try {
        const response = yield call(api.auth.googleLogin);
        if (!response) return;
        const { chats, profile } = response;
        yield put(saveLogInByGoogle(profile))
        yield put(saveChats(chats))

        yield put(push(routes.profile.link()))
    } catch (error) {
        console.log(error);
        yield put(failLogInByGoogle());
    }
}

function* clearAuthSaga() {
    // yield removeProfileToLocalStorage();
}

export function* authSaga() {
    yield takeEvery(auth.FETCH_LOGIN_BY_GOOGLE, fetchLogInByGoogleSaga);

    yield takeEvery(auth.CLEAR_AUTH, clearAuthSaga);
}
