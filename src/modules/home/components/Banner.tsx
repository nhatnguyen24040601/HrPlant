import React from 'react';
import styled from 'styled-components/native';

import { scales } from 'theme/CommonSize';

const Banner = () => {
    return (
        <Wrapper />
    )
}

export default Banner;

const Wrapper = styled.View`
    height: ${scales(32)}px;
    background-color: tomato;
    margin-bottom: ${scales(16)}px;
`;
