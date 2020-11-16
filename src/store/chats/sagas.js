import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as chats from './types';
import { api } from 'services';
import { getAuthProfileUid } from 'store/auth/selectors';

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


export function* chatsSaga() {
    yield takeEvery(chats.CREATE_NEW_CHAT, createNewChatSaga);
}
