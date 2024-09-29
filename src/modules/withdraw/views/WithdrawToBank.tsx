import React from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';

import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import {scales} from 'theme/CommonSize';

const WithdrawToBank = () => {
    const onAddPressed = () => {
        navigate('AddWithdrawBank');
    };

    const renderItemEmpty = () => {
        return (
            <ItemEmpty>
                <ViewIcon>
                    <SVGIcon name="ic-recipient-bank" size={scales(24)} />
                </ViewIcon>
                <ViewDetailItem>
                    <LabelItem type="s_14_21">No bank account added</LabelItem>
                    <DescItem type="r_12_18">You have not added a withdrawal bank account</DescItem>
                </ViewDetailItem>
            </ItemEmpty>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Withdraw to bank" />
            <Content>
                <Label type="m_14_17">Withdrawal bank accounts</Label>
                {renderItemEmpty()}
                <Line />
                <ButtonAdd text="Add new account" onPress={onAddPressed} />
            </Content>
        </Wrapper>
    );
};

export default WithdrawToBank;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const Label = styled(Text)`
    margin-bottom: ${scales(16)}px;
`;

const Content = styled.View`
    padding: ${scales(16)}px;
`;

const ItemEmpty = styled.View`
    background-color: ${(p) => p.theme.grey6};
    padding: ${scales(16)}px ${scales(12)}px;
    border-radius: ${scales(8)}px;
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    background-color: ${(p) => p.theme.white};
    justify-content: center;
    align-items: center;
`;

const LabelItem = styled(Text)`
    color: ${(p) => p.theme.green7};
`;

const DescItem = styled(Text)`
    color: ${(p) => p.theme.grey1};
`;

const ViewDetailItem = styled.View`
    flex: 1;
    gap: ${scales(4)}px;
`;

const Line = styled.View`
    width: 100%;
    height: ${scales(1)}px;
    background-color: ${(p) => p.theme.grey2};
    margin: ${scales(24)}px 0px;
`;

const ButtonAdd = styled(GlobalSubmitButton)``;
