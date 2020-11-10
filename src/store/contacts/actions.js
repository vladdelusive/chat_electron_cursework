import * as contacts from './types';

export const fetchContacts = () => ({ type: contacts.FETCH_CONTACTS });
export const saveContacts = (payload) => ({ type: contacts.SAVE_CONTACTS, payload });

export const changeFiltersContacts = (payload) => ({ type: contacts.CHANGE_FILTERS_CONTACTS, payload });
export const saveFilteredContactsData = (payload) => ({ type: contacts.SAVE_FILTERS_CONTACTS, payload });
