import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as contacts from './types';
import { saveContacts, saveFilteredContactsData } from './actions';
import { api } from 'services';
import { randomIntegerInRange } from 'utils';
import { getContactsList, getContactsFilters } from './selectors';
import { NATIONALITIES } from 'constants/nationalities';
import { getAuthProfile } from 'store/auth/selectors';

const resultsInt = randomIntegerInRange(500, 1000)

function* fetchContactsSaga() {
    try {
        const response = yield call(api.contacts.fetchContacts, resultsInt);
        yield put(saveContacts(response.results));
    } catch (error) {
        console.warn(error);
    }
}

function* changeFiltersContactsSaga(action) {
    const { payload } = action
    try {
        const data = yield select(getContactsList);
        const stateFilters = yield select(getContactsFilters);
        const newStateFilters = stateFilters ? { ...stateFilters, ...payload } : payload

        const filters = Object.entries(newStateFilters).filter(([k, val]) => {
            if (Array.isArray(val)) {
                return !!val.length
            }
            return !!val
        })
        const profileEmail = yield select(getAuthProfile).email;
        const nats = Object.entries(NATIONALITIES)
        const filteredData = filters.length
            ? data.map((el) => {
                return filters.filter(([filterKey, filterVal]) => {
                    if (Array.isArray(filterVal) && filterKey === "nat") {
                        const natsArrayKeys = filterVal.map((nation) => nats.find(([, nVal]) => nVal.name === nation)[0])
                        return natsArrayKeys.some(key => key === el["nat"])
                    }
                    if (filterKey === "gender") {
                        return el["gender"]?.toLowerCase() === filterVal.toLowerCase()
                    }
                    if (filterKey === "email") {
                        return el["email"] === profileEmail
                    }
                    return el[filterKey]?.toString().toLowerCase().includes(filterVal.toString().toLowerCase().trim())
                }).length === filters.length ? el : null
            }).filter(e => e) : null
        yield put(saveFilteredContactsData({ data: filteredData, filters: newStateFilters }));
    } catch (error) {

    }
}

export function* contactsSaga() {
    yield takeEvery(contacts.FETCH_CONTACTS, fetchContactsSaga);
    yield takeEvery(contacts.CHANGE_FILTERS_CONTACTS, changeFiltersContactsSaga);
}
