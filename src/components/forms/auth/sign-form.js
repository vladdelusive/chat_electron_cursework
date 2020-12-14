import React from 'react';
import { Button, Col, Form, Row, Spin, Upload } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { checkForm } from 'utils/validation';
import { AInput } from 'components';
import { AInputPassword } from 'components/controls';
import { noty } from 'utils';

function SignUpForm(props) {
    const {
        pending,
        handleSubmit,
    } = props

    const logIn = (values) => {
        noty("info", "Данный функционал в разработке")
    }

    const propsUpload = {
        name: 'file',
        onChange(info) {

        },
    }

    return <Form onSubmitCapture={handleSubmit(logIn)}>
        <Spin spinning={false}>
            <div className={'form__body'}>
                <Row>
                    <Field
                        component={AInput}
                        prefix={<UserOutlined />}
                        name={'email'}
                        type={'text'}
                        placeholder={'Почта'}
                        size="large"
                        hint="Введите любую свою почту"
                    />
                </Row>
                <Row>
                    <Field
                        component={AInputPassword}
                        prefix={<LockOutlined />}
                        name={'password'}
                        type={'password'}
                        placeholder={'Пароль'}
                        size="large"
                        iconRender={visible => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        hint="Введите корректный пароль"
                    />
                </Row>
                <Row style={{ marginBottom: 20 }}>
                    <Upload {...propsUpload}>
                        <Button icon={<UploadOutlined />}>Загрузите аватарку</Button>
                    </Upload>
                </Row>
            </div>
        </Spin>

        <div className={'form__footer'}>
            <Row gutter={6}>
                <Col span={24}>
                    <Button
                        htmlType={'submit'}
                        className={'control control--submit'}
                        type={'primary'}
                        size="large"
                        style={{ width: "100%" }}
                        loading={pending}
                        onClick={() => { }}
                    >
                        Зарегистрироваться
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

    }
};

const mapDispatchToProps = {};

const EnhancedSignUpForm = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'sign-form',
        validate,
    })
)(SignUpForm);

export { EnhancedSignUpForm };