import { http } from 'services';
import { parseContactsList } from '../parse';

export const auth = {
	login: (payload) => http.get('/api', { params: { seed: payload, results: 1 } }).then((response) => {
		return response ? parseContactsList(response) : null;
	}),
};
