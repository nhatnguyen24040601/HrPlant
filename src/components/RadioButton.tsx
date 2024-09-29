import React from 'react';
import styled from 'styled-components/native';
import {scales} from 'theme/CommonSize';

interface IProps {
    isChecked: boolean;
}

const RadioButton = (props: IProps) => {
    const {isChecked} = props;
    return (
        <Wrapper isChecked={isChecked}>
            <Dot isChecked={isChecked} />
        </Wrapper>
    );
};

export default RadioButton;

const Wrapper = styled.View<{isChecked: boolean}>`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(12)}px;
    border-width: ${scales(3)}px;
    border-color: ${(p) => (p.isChecked ? p.theme.green1 : p.theme.black1)};
    justify-content: center;
    align-items: center;
`;

const Dot = styled.View<{isChecked: boolean}>`
    width: ${scales(11)}px;
    height: ${scales(11)}px;
    border-radius: ${scales(8)}px;
    background-color: ${(p) => (p.isChecked ? p.theme.green1 : p.theme.transparent)};
`;
