import { call, put, takeEvery } from 'redux-saga/effects';
import * as auth from './types';
import { loginFail, loginSuccess } from './actions';
import { api } from 'services';
import { push } from 'connected-react-router';
import { routes } from 'routes';

const saveProfileToLocalStorage = (auth) => window.localStorage.setItem("auth", auth);
const removeProfileToLocalStorage = () => window.localStorage.removeItem("auth");

function* loginRequestSaga(action) {
    const { payload } = action;
    const { email } = payload;
    try {
        const response = yield call(api.auth.login, window.encodeURIComponent(email));
        yield put(loginSuccess(response.results[0]));
        yield saveProfileToLocalStorage(email)
        yield put(push(routes.profile.link()))
    } catch (error) {
        yield put(loginFail());
    }
}

// function* loginSuccessSaga(action) {
//     const { payload } = action;
//     try {
//         yield push
//     } catch (error) {
//         console.warn(error);
//     }
// }

function* logoutRequestSaga() {
    try {
        yield
    } catch (error) {
        console.warn(error);
    } finally {
    }
}

function* clearAuthSaga() {
    yield removeProfileToLocalStorage();
}

export function* authSaga() {
    yield takeEvery(auth.LOGIN_REQUEST, loginRequestSaga);
    // yield takeEvery(auth.LOGIN_SUCCESS, loginSuccessSaga);
    yield takeEvery(auth.LOGOUT_REQUEST, logoutRequestSaga);

    yield takeEvery(auth.CLEAR_AUTH, clearAuthSaga);
}
