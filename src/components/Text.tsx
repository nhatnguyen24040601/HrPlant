import React, {useMemo} from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';

import {scales} from 'theme/CommonSize';

import Fonts from 'theme/Fonts';

interface IProps extends TextProps {
    type?: string;
}

const Text = (props: IProps) => {
    const {type, children} = props;
    const font = {
        b: Fonts.bold,
        m: Fonts.medium,
        r: Fonts.regular,
        s: Fonts.semiBold,
    };

    const getStyle = useMemo(() => {
        if (type) {
            const [fontFamily, fontSize, lineHeight] = type.split('_');
            return {
                ...(font?.[fontFamily] || Fonts.regular),
                fontSize: scales(Number(fontSize || 14)),
                lineHeight: scales(Number(lineHeight || 16)),
            };
        }
    }, [type]);

    return (
        <DefaultText {...props} style={[props.style, type && getStyle]}>
            {children}
        </DefaultText>
    );
};

export default Text;

const DefaultText = styled.Text`
    font-size: ${scales(14)}px;
    line-height: ${scales(16)}px;
    ${Fonts.regular};
    color: ${(p) => p.theme.black1};
`;
