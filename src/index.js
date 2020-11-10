import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter as ConnectedRouterProvider } from 'connected-react-router';
import { Root } from 'components';
import { history } from 'routes/history';
import { store } from 'store';
import { restoreAuth } from 'store/restore-auth';
import { IS_DEVELOPMENT } from 'constants/env';

const root = document.getElementById('root');
const render = (Component, root, done = () => { }) => {
	ReactDOM.render(
		<ReduxProvider store={store}>
			<ConnectedRouterProvider history={history}>
				<Component />
			</ConnectedRouterProvider>
		</ReduxProvider>,
		root,
		done,
	);
};

restoreAuth()
render(Root, root);
window.addEventListener('storage', (e) => {
	if (e.key === 'auth') {
		restoreAuth();
		if (IS_DEVELOPMENT !== 'production') {
			const currentTime = new Date().toLocaleTimeString();
			console.log(`[Storage/Auth] at ${currentTime}\n ${window.localStorage.getItem('auth')}`);
		}
	}
});