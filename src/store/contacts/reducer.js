import { createReducer } from 'store/utils';
import * as contacts from './types';

const initialState = {
    contactsList: [],
    searchedList: {
        data: null,
        filters: {}
    },
};

export const contactsReducer = createReducer(initialState, {
    [contacts.SAVE_CONTACTS](state, action) {
        const { payload } = action
        const list = state.contactsList.length ? state.contactsList : payload
        return {
            ...state,
            contactsList: list
        };
    },

    [contacts.SAVE_FILTERS_CONTACTS](state, action) {
        const { payload } = action;
        const { data, filters } = payload
        return {
            ...state,
            searchedList: {
                ...state.searchedList,
                data,
                filters,
            }
        };
    },

});
