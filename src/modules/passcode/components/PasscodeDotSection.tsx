import React from 'react';
import styled from 'styled-components/native';

import Text from 'components/Text';
import {scales} from 'theme/CommonSize';

interface IProps {
    value: string;
    type: 'dot' | 'number';
}

const PasscodeDotSection = (props: IProps) => {
    const {value, type} = props;

    const renderItemTypeNumber = (_, index: number) => {
        return (
            <ViewNumber key={index}>
                <Number type="s_16_24">{value?.[index]}</Number>
            </ViewNumber>
        );
    };

    const renderTypeDot = (_, index) => {
        const inputded = value.length && index < value.length;
        return <Dot key={index} inputded={inputded} />;
    };

    return (
        <WrapNumber>
            {Array(4)
                .fill('')
                .map(type === 'dot' ? renderTypeDot : renderItemTypeNumber)}
        </WrapNumber>
    );
};

export default PasscodeDotSection;

const WrapNumber = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: ${scales(16)}px;
`;

const ViewNumber = styled.View`
    width: ${scales(44)}px;
    height: ${scales(54)}px;
    border-radius: ${scales(8)}px;
    background-color: ${(p) => p.theme.grey6};
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey13};
    justify-content: center;
    align-items: center;
`;

const Number = styled(Text)``;

const Dot = styled.View<{inputded: boolean}>`
    width: ${scales(15)}px;
    height: ${scales(15)}px;
    border-radius: ${scales(8)}px;
    background-color: ${(p) => (p.inputded ? p.theme.green1 : p.theme.grey13)};
`;
