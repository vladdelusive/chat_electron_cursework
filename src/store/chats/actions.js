import * as chats from './types';

export const createNewChat = (payload) => ({ type: chats.CREATE_NEW_CHAT, payload });

export const saveChats = (payload) => ({ type: chats.SAVE_CHATS, payload });

export const setActiveChatId = (payload) => ({ type: chats.SET_ACTIVE_CHAT_ID, payload });




