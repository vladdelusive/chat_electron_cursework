import React from 'react';
import { Spin as SpinAnt } from 'antd';

const Spin = (props) => {
    const { loading, isDataExist, children, spinSize = 'large' } = props;
    return !isDataExist || loading ? <SpinAnt size={spinSize} /> : children
};

export { Spin };