import { store } from './index';
import { fetchLogInByGoogle, clearAuth } from './auth/actions';

export const restoreAuth = () => {
	const auth = window.localStorage.getItem("auth");
	// if (auth) {
	// 	store.dispatch(fetchLogInByGoogle({ email: auth }));
	// } else {
	// 	store.dispatch(clearAuth());
	// }
};
