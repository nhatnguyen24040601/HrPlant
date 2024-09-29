import React from 'react';
import styled from 'styled-components/native';

import Text from 'components/Text';
import {scales} from 'theme/CommonSize';

const HeaderActivity = () => {
    return (
        <Wrapper>
            <Title type="s_16_24">Activities</Title>
        </Wrapper>
    );
};

export default HeaderActivity;

const Wrapper = styled.View`
    padding: ${scales(16)}px;
`;

const Title = styled(Text)``;
