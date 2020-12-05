import { call, put, takeEvery } from 'redux-saga/effects';
import * as auth from './types';
import {
    saveLogInByGoogle,
    failLogInByGoogle,
    saveUpdateProfile,
} from './actions';
import { api } from 'services';
import { push } from 'connected-react-router';
import { routes } from 'routes';
import { saveChats } from 'store/chats/actions';

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

function* setUpdateProfileAndChatsSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(api.auth.preparedUpdatedProfileData, payload);
        const { chats, profile } = response;
        yield put(saveUpdateProfile(profile))
        yield put(saveChats(chats))
    } catch (error) {
        console.log(error);
    }
}

function* clearAuthSaga() {
    // yield removeProfileToLocalStorage();
}

export function* authSaga() {
    yield takeEvery(auth.FETCH_LOGIN_BY_GOOGLE, fetchLogInByGoogleSaga);
    yield takeEvery(auth.SET_UPDATE_PROFILE, setUpdateProfileAndChatsSaga);
    yield takeEvery(auth.CLEAR_AUTH, clearAuthSaga);
}
