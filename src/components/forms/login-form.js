import React from 'react';
import { Button, Col, Form, Row, Spin } from 'antd';
import { CloseOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { checkForm } from 'utils/validation';
import { AInput } from 'components';
import { AInputPassword } from 'components/controls';
import { loginRequest } from 'store/auth/actions'
import { getAuthIsLoggingIn } from 'store/auth/selectors';

function LoginForm(props) {
    const {
        pending,
        handleSubmit,
        loginRequest,
        setShowModal,
    } = props

    const logIn = (values) => {
        loginRequest(values)
    }

    return <Form onSubmitCapture={handleSubmit(logIn)}>
        <Spin spinning={pending}>
            <div className={'form__body'}>
                <Row>
                    <Field
                        component={AInput}
                        prefix={<UserOutlined />}
                        name={'email'}
                        type={'text'}
                        placeholder={'Email'}
                        size="large"
                        hint="Type any valid email"
                    />
                </Row>
                <Row>
                    <Field
                        component={AInputPassword}
                        prefix={<LockOutlined />}
                        name={'password'}
                        type={'password'}
                        placeholder={'Password'}
                        size="large"
                        iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        hint="Type any valid password"
                    />
                </Row>
            </div>
        </Spin>

        <div className={'form__footer'}>
            <Row gutter={6}>
                <Col span={18}>
                    <Button
                        htmlType={'submit'}
                        className={'control control--submit'}
                        type={'primary'}
                        size="large"
                        style={{ width: "100%" }}
                        loading={pending}
                        onClick={() => setShowModal(false)}
                    >
                        Sign In
                    </Button>
                </Col>
                <Col span={6}>
                    <Button
                        className={'control control--cancel'}
                        type={'link'}
                        size="large"
                        icon={<CloseOutlined />}
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </div>
    </Form>
}

const validate = (values) => {
    return checkForm(values, {
        'email': { required: true, email: true },
        'password': { required: true, minLength: 8 },
    });
};

const mapStateToProps = (state) => {
    return {
        pending: getAuthIsLoggingIn(state),
    }
};

const mapDispatchToProps = { loginRequest };

const EnhancedLoginForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'login-form',
        validate,
    })
)(LoginForm);

export { EnhancedLoginForm };