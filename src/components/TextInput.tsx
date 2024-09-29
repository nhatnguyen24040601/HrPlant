import React, {forwardRef, useMemo} from 'react';
import {TextInput as TextInputDetault, TextInputProps} from 'react-native';
import styled from 'styled-components/native';

import {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import {useColors} from 'theme/provider/ThemeProvider';
interface Props extends TextInputProps {
    textType?: string;
}

const TextInput = (props, ref) => {
    const Colors = useColors();
    const {textType} = props;

    const font = {
        r: Fonts.regular,
        m: Fonts.medium,
        b: Fonts.bold,
    };

    const getStyle = useMemo(() => {
        if (!textType) {
            return {};
        }
        const [fontFamily, fontSize] = textType?.split('_');
        return {
            ...font?.[fontFamily],
            fontSize: Number(fontSize),
        };
    }, [textType]);

    return <Input placeholderTextColor={Colors.grey1} {...props} style={[props?.style, getStyle]} ref={ref} />;
};

export default forwardRef<TextInputDetault, Props>(TextInput);

const Input = styled.TextInput<{multiline: boolean}>`
    flex: 1;
    font-size: ${scales(14)}px;
    color: ${(p) => p.theme.black1};
    height: ${scales(52)}px;
    ${Fonts.medium};
    ${(p) => p.multiline && {height: scales(90)}}
`;
