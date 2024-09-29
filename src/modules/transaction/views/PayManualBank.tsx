import React from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';

import { getColors } from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';

const PayManualBank = () => {
    const renderDetailItem = ({label, value}: {label: string; value: string}) => {
        return (
            <ViewDetailItem>
                <Label type="m_12_18">{label}</Label>
                <Value type="m_12_18">{value}</Value>
            </ViewDetailItem>
        );
    };

    const renderItemManualBank = () => {
        return (
            <WrapItem>
                {renderDetailItem({label: 'Account Name', value: 'Rhics Technology LTD.'})}
                {renderDetailItem({label: 'Account Number', value: '0000000000'})}
                {renderDetailItem({label: 'Bank Name', value: 'Chase Bank'})}
                <ButtonCopy text="Copy details" textStyle={toStyleSheet(TextCopy)} />
            </WrapItem>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Manual bank transfer" containerStyle={toStyleSheet(HeaderContainer)} />
            <Title type="s_20_26">Pay into any of the accounts below</Title>
            <ListBank
                data={Array(5).fill({})}
                renderItem={renderItemManualBank}
                contentContainerStyle={toStyleSheet(ContentList)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
            />
            <ViewBottom>
                <ButtonContinue text="Confirm payment" />
            </ViewBottom>
        </Wrapper>
    );
};

export default PayManualBank;

const ContentList = css`
    padding: 0px ${scales(16)}px;
    gap: ${scales(16)}px;
    padding-bottom: ${scales(24)}px;
`;

const TextCopy = css`
    color: ${getColors().green1};
`;

const HeaderContainer = css`
    background-color: ${getColors().white};
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${p => p.theme.grey15};
`;

const Title = styled(Text)`
    margin: ${scales(16)}px;
    margin-bottom: ${scales(24)}px;
`;

const WrapItem = styled.View`
    padding: ${scales(16)}px ${scales(12)}px;
    gap: ${scales(12)}px;
    background-color: ${p => p.theme.white};
    border-radius: ${scales(8)}px;
`;

const ViewDetailItem = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled(Text)`
    color: ${p => p.theme.grey1};
`;

const Value = styled(Text)``;

const ButtonCopy = styled(GlobalSubmitButton)`
    background-color: ${p => p.theme.white};
    border-width: ${scales(1)}px;
    border-color: ${p => p.theme.green1};
    margin-top: ${scales(8)}px;
`;

const ListBank = styled.FlatList``;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${p => p.theme.grey15};
    border-top-width: ${scales(1)}px;
    border-top-color: ${p => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;
