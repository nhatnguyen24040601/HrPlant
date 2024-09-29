import React, {useRef} from 'react';
import {ViewProps} from 'react-native';
import {TextInput as RNTextInput} from 'react-native';
import styled from 'styled-components/native';

import Text from './Text';

import TextInput from 'components/TextInput';
import {scales} from 'theme/CommonSize';

interface IProps extends ViewProps {
    length?: number;
    code: string;
    setCode: (code: string) => void;
}

const InputCode = (props: IProps) => {
    const {length = 6, code, setCode} = props;
    const inputRef = useRef<RNTextInput>();

    const onStartShouldSetResponder = () => {
        inputRef.current.focus();
        return true;
    };

    const renderItem = (index: number) => {
        return (
            <Item key={index} onStartShouldSetResponder={onStartShouldSetResponder}>
                <Text>{code?.[index]}</Text>
            </Item>
        );
    };

    const onChangeText = (text) => {
        setCode(text);
    };

    return (
        <Wrapper {...props}>
            {Array(length)
                .fill('')
                .map((_, index) => renderItem(index))}
            <Input ref={inputRef} maxLength={length} onChangeText={onChangeText} keyboardType="number-pad" />
        </Wrapper>
    );
};

export default InputCode;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
`;

const Item = styled.View`
    flex: 1;
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey7};
    background-color: ${(p) => p.theme.grey6};
    height: ${scales(56)}px;
    border-radius: ${scales(8)}px;
    justify-content: center;
    align-items: center;
`;

const Input = styled(TextInput)`
    opacity: 0;
    position: absolute;
`;
