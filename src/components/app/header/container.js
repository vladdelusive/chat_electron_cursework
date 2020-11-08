import './style.scss';
import { compose } from 'redux';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View } from './view';
import { getAuthIsAuthenticated } from 'store/auth/selectors';
import { LoginForm } from 'components/forms';
import { NavBar } from '../navbar';
import { Col, Row } from 'antd';
import { Logo } from '../logo';
import Modal from 'antd/lib/modal/Modal';
import { Profile } from '../profile';

const HeaderContainer = (props) => {
	const { isAuth } = props;
	const [showModal, setShowModal] = useState(false)

	const correctNavbar = isAuth ? <Profile /> : <View setShowModal={setShowModal} />

	return <div className={'header'}>
		<Row type={'flex'} gutter={36} align={'middle'}>
			<Col>
				<Logo />
			</Col>
			<Col className={'_flex-grow'}>
				<Row type={'flex'} gutter={16} align={'middle'}>
					<Col className={'_flex-grow'}>
						<NavBar />
					</Col>
					{correctNavbar}
				</Row>
			</Col>
		</Row>
		{!isAuth ? <Modal
			title="Sign In"
			visible={showModal}
			onOk={() => setShowModal(false)}
			onCancel={() => setShowModal(false)}
			centered
			footer={null}
			closable={false}
		>
			<LoginForm setShowModal={setShowModal} />
		</Modal> : null}
	</div>
}

const mapStateToProps = (state) => {
	// const auth = window.localStorage.getItem("auth")
	return {
		isAuth: getAuthIsAuthenticated(state)
	};
};

const mapDispatchToProps = null;

const Header = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(HeaderContainer);

export { Header };
