import { http } from 'services';
import { parseContactsList } from '../parse';

export const contacts = {
	fetchContacts: (payload) => http.get('/api', { params: { results: payload } }).then((response) => {
		return response ? parseContactsList(response) : null;
	}),
};
