import React from 'react';
import { RoutesSwitch } from 'routes';
import 'antd/dist/antd.css';
import 'assets/styles/index.scss';
import { OfflineModal } from 'components/modals';
import { useSelector } from 'react-redux';
import { getNotificationOnlineStatus } from 'store/notifications/selectors';

const View = React.memo(() => {
	const statusOnline = useSelector(state => getNotificationOnlineStatus(state))

	return (
		<>
			{!statusOnline && <OfflineModal />}
			<RoutesSwitch />
		</>
	);
});

export { View };
