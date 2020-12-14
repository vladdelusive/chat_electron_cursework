import './style.scss';
import React, { useState } from 'react';
import { Button, Col, Modal } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
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
					<Button
						style={{ display: "flex", alignItems: "center" }}
						onClick={() => {
							logInByGoogle()
							setShowModal(false)
						}}
						icon={<GoogleOutlined style={{ color: "#00a7b7", fontSize: 24 }} />}
						type="link"
					>Зайти через Google</Button>}
				onCancel={() => setShowModal(false)}
				footer={false}
			>
				<LoginForm />
			</Modal>
		</>
	);
};

export { View };
