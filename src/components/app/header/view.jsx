import './style.scss';
import React, { useState } from 'react';
import { Button, Col, Modal } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { LoginForm } from 'components/forms'

const View = ({ logInByGoogle }) => {

	const [showModal, setShowModal] = useState()
	return (
		<>
			<Col>
				<Button
					type={'link'}
					icon={<LoginOutlined />}
					onClick={() => setShowModal(true)}
				>
					Войти
			</Button>
			</Col>
			<Modal
				visible={showModal}
				title={
					<Button onClick={() => {
						logInByGoogle()
						setShowModal(false)
					}} type="link">Зайти через Google</Button>}
				onCancel={() => setShowModal(false)}
				footer={false}
			>
				<LoginForm />
			</Modal>
		</>
	);
};

export { View };
