import React from 'react';
import { Select } from 'antd';

export const obj2options = (obj) => {
    if (!obj) return null;

    return Object.keys(obj).map((key) => {
        const option = obj[key];
        return <Select.Option key={key} value={option}>{option}</Select.Option>;
    });
};