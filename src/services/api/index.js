import { IS_DEVELOPMENT } from 'constants/env';
import { auth } from './auth';
import { contacts } from './contacts';

export const api = {
    auth,
    contacts,
};

if (IS_DEVELOPMENT) {
    window.api = api;
}