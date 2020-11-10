import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getContacts = (state) => state.contacts;
const _getPathname = (state) => state.router.location.pathname;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getContactsList = createSelector(
    [_getContacts],
    (contacts) => contacts.contactsList
);

export const getContactProfile = createSelector(
    [getContactsList, _getPathname],
    (contactsList, path) => {
        const id = path.replace("/contacts/", "")
        return contactsList?.find(e => +e.id === +id) || null
    }
);

export const _getSearchedContacts = createSelector(
    [_getContacts],
    (searchedContacts) => searchedContacts.searchedList
);

export const getContactsFilters = createSelector(
    [_getSearchedContacts],
    (searchedList) => searchedList.filters
);

export const getContactsFilteredData = createSelector(
    [_getSearchedContacts],
    (searchedList) => searchedList.data
);
