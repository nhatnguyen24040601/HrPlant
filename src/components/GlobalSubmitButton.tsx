import React, {useMemo} from 'react';
import {ActivityIndicator, TextStyle, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

import Text from './Text';

import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

interface IProps extends TouchableOpacityProps {
    textStyle?: TextStyle;
    text: string;
    textType?: string;
    loading?: boolean;
    iconLeft?: React.ReactElement;
}

const GlobalSubmitButton = (props: IProps) => {
    const {text, textType, loading, disabled, iconLeft} = props;
    const Colors = useColors();

    const shouldDisable = useMemo(() => {
        return loading || disabled;
    }, [loading, disabled]);

    return (
        <Button {...props} style={props.style} disabled={shouldDisable}>
            {iconLeft}
            <TextButton disabled={shouldDisable} type={textType || 's_14_16'} style={props.textStyle}>
                {text}
            </TextButton>
            {loading && <ActivityIndicator size={scales(14)} color={Colors.white} />}
        </Button>
    );
};

export default GlobalSubmitButton;

const Button = styled.TouchableOpacity<{disabled?: boolean}>`
    background-color: ${(p) => (p.disabled ? p.theme.green12 : p.theme.green1)};
    width: 100%;
    height: ${scales(52)}px;
    justify-content: center;
    align-items: center;
    border-radius: ${scales(8)}px;
    flex-direction: row;
    gap: ${scales(10)}px;
`;

const TextButton = styled(Text)`
    color: ${(p) => p.theme.white};
`;
