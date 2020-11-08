import {
	PageHome,
	PageProfile,
	PageContacts,
	NotFound,
	PageContact,
} from 'pages';

const routes = {
	'home': {
		path: '/',
		exact: true,
		page: PageHome,
		name: 'Home',
		link() {
			return this.path;
		},
		isNeedAuth: false,
	},
	'profile': {
		path: '/profile',
		page: PageProfile,
		name: 'profile',
		link() {
			return this.path;
		},
		exact: true,
		isNeedAuth: true,
	},
	'contacts': {
		path: '/contacts',
		page: PageContacts,
		name: 'contacts',
		link() {
			return this.path;
		},
		exact: true,
		isNeedAuth: true,
	},
	'contacts-profile': {
		path: '/contacts/:id',
		page: PageContact,
		name: 'contact-profile',
		link(id) {
			return this.path.replace(":id", id);
		},
		isNeedAuth: true,
	},
	'not-found': {
		path: "*",
		page: NotFound,
		isNeedAuth: false,
	}
};

const __ROOT_ROUTE__ = routes.home.link();

export { routes, __ROOT_ROUTE__ };
