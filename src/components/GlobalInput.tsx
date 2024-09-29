import React, { ReactElement, useState } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import TextInput from './TextInput';

import { scales } from 'theme/CommonSize';
import Fonts from 'theme/Fonts';

interface IProps extends TextInputProps {
    containerStyle?: ViewStyle;
    viewRight?: ReactElement;
    textType?: string;
    viewLeft?: ReactElement
}

const GlobalInput = (props: IProps) => {
    const { containerStyle, viewRight, textType, viewLeft } = props;
    const [focus, setFocus] = useState(false);

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = () => {
        setFocus(false)
    }

    return (
        <Wrapper focus={focus} style={containerStyle}>
            {viewLeft}
            <Input textType={textType} {...props} onBlur={onBlur} onFocus={onFocus} />
            {viewRight}
        </Wrapper>
    );
};

export default GlobalInput;


const Wrapper = styled.View<{ focus?: boolean }>`
    border-radius: ${scales(8)}px;
    border-width: ${scales(2)}px;
    padding: 0px ${scales(15)}px;
    flex-direction: row;
    align-items: center;
    border-color: ${p => p?.focus ? p.theme.green2 : p.theme.grey7};
    height: ${scales(52)}px;
    background-color: ${p => p?.focus ? p.theme.white : p.theme.grey6};
    gap: ${scales(8)}px;
`;

const Input = styled(TextInput)`
    flex: 1;
    font-size: ${scales(14)}px;
    color: ${p => p.theme.grey1};
    ${Fonts.medium}
`;
