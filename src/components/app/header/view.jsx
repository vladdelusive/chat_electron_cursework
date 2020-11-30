import './style.scss';
import React from 'react';
import { Button, Col } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const View = ({ logInByGoogle }) => {
	return (
		<Col>
			<Button
				type={'link'}
				icon={<LoginOutlined />}
				onClick={() => logInByGoogle()}
			>
				Sign In
			</Button>
		</Col>
	);
};

export { View };
