import { store } from './index';
import { loginRequest, clearAuth } from './auth/actions';

export const restoreAuth = () => {
	const auth = window.localStorage.getItem("auth");
	if (auth) {
		store.dispatch(loginRequest({ email: auth }));
	} else {
		store.dispatch(clearAuth());
	}
};
