import React from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';

import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import { getColors } from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const WalletAccountDetail = () => {
    const Colors = useColors();

    const renderWarning = () => {
        return (
            <ViewWarning>
                <SVGIcon name="ic-warning" size={scales(20)} color={Colors.yellow1} />
                <TextWarning type="m_12_18">
                    You can only send money to this account from a UK-based bank and the name of the sender must match
                    the name on your account
                </TextWarning>
                <ButtonClose>
                    <SVGIcon name="ic-x" size={scales(20)} color={Colors.black1} />
                </ButtonClose>
            </ViewWarning>
        );
    };

    const renderItemDetail = ({label, value, onPress}: {label: string; value: string; onPress?: () => void}) => {
        return (
            <ViewItemDetail>
                <Label type="r_12_18">{label}</Label>
                <ViewValue>
                    <Label type="r_12_18">{value}</Label>
                    {!!onPress && (
                        <ButtonCopy onPress={onPress}>
                            <SVGIcon name="ic-copy" size={scales(20)} color={Colors.green1} />
                        </ButtonCopy>
                    )}
                </ViewValue>
            </ViewItemDetail>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Account details" />
            {renderWarning()}
            <ViewDetail>
                {renderItemDetail({label: 'Account number', value: '01598905', onPress: () => {}})}
                {renderItemDetail({label: 'Account name', value: 'Christian Nwaigwe'})}
                {renderItemDetail({label: 'Bank name', value: 'Clear Bank'})}
                {renderItemDetail({label: 'Bank sort code', value: '040831', onPress: () => {}})}
            </ViewDetail>
            <ButtonShare text="Share details" textStyle={toStyleSheet(TextSubmitStyle)} />
        </Wrapper>
    );
};

export default WalletAccountDetail;

const TextSubmitStyle = css`
    color: ${getColors().green1};
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const ViewWarning = styled.View`
    padding: ${scales(12)}px ${scales(16)}px;
    flex-direction: row;
    gap: ${scales(8)}px;
    background-color: ${(p) => p.theme.yellow5};
`;

const TextWarning = styled(Text)`
    flex: 1;
`;

const ButtonClose = styled.TouchableOpacity``;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ViewItemDetail = styled(Row)`
    justify-content: space-between;
`;

const Label = styled(Text)``;

const ViewValue = styled(Row)`
    gap: ${scales(8)}px;
`;

const ButtonCopy = styled.TouchableOpacity``;

const ViewDetail = styled.View`
    padding: ${scales(16)}px;
    gap: ${scales(21)}px;
`;

const ButtonShare = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
    background-color: ${(p) => p.theme.white};
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.green1};
    height: ${scales(42)}px;
    margin-top: ${scales(10)}px;
`;
