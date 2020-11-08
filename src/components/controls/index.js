/* eslint-disable react/prop-types,react/display-name,react/no-children-prop */
import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export const makeField = Component => props => {
    const {
        input,
        meta,
        children,
        label,
        formItemLayout,
        hasFeedback = true,
        hint = "",
        ...rest
    } = props;
    const asyncValidating = meta.asyncValidating;
    const hasError = meta.touched && meta.invalid;
    const extra = {};

    const showValidationFeedback = hasFeedback && (asyncValidating || hasError || meta.valid);

    return (
        <FormItem
            label={label}
            validateStatus={asyncValidating ? 'validating' : hasError ? 'error' : 'success'}
            hasFeedback={showValidationFeedback}
            help={hasError && meta.error}
            extra={hint}
            {...formItemLayout}
            {...input}
        >
            <Component className={'control__component'} {...rest} {...extra} children={children} />
        </FormItem>
    );
};

export const AInput = makeField(Input);
export const AInputPassword = makeField(Input.Password);