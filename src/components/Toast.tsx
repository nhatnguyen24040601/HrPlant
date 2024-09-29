import React, {useEffect} from 'react';
import styled from 'styled-components/native';

import {scales} from 'theme/CommonSize';

const Toast = () => {
    useEffect(() => {
        global.showToast = showToast;
    }, []);

    const showToast = () => {};

    return <Wrapper />;
};

export default Toast;

const Wrapper = styled.View`
    position: absolute;
    width: ${scales(50)}px;
    height: ${scales(200)}px;
    background-color: tomato;
    top: 0;
    left: 0;
    z-index: 999;
`;
