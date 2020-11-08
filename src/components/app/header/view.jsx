import './style.scss';
import React from 'react';
import { Button, Col } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const View = ({ setShowModal }) => {
	return (
		<Col>
			<Button
				type={'link'}
				icon={<LoginOutlined />}
				onClick={() => setShowModal(true)}
			>
				Sign In
			</Button>
		</Col>
	);
};

export { View };
