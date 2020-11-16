import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as chats from './types';
import { api } from 'services';
import { saveUsersForChat } from './actions';
import { getAuthProfileUid } from 'store/auth/selectors';
import { getChatsList } from './selectors';

function* createNewChatSaga(action) {
    try {
        const { payload } = action;
        const userUid = yield select(getAuthProfileUid)
        const chat = {
            messages: [],
            users: [userUid, payload]
        }
        const response = yield call(api.chats.createNewChat, chat);
        debugger
    } catch (error) {
        console.warn(error);
    }
}

function* fetchUsersForChatSaga() {
    try {
        const response = yield call(api.chats.fetchProfiles);
        if (!response) return;
        const userUid = yield select(getAuthProfileUid)
        const userChats = yield select(getChatsList)
        const profiles = response.filter(profile => profile.id !== userUid && !userChats.find(chat => chat.userInfo.uid === profile.id))
        debugger
        yield put(saveUsersForChat(profiles))
    } catch (error) {
        console.warn(error);
    }
}

export function* chatsSaga() {
    yield takeEvery(chats.CREATE_NEW_CHAT, createNewChatSaga);
    yield takeEvery(chats.FETCH_USERS_FOR_CHAT, fetchUsersForChatSaga);
}
