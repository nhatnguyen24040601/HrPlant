import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import React from 'react';
import styled from 'styled-components/native';

import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

interface IAction {
    label: string;
    icon: TNameOfIconSVG;
    onPress: () => void;
    backgroundColor: string;
}

const ActionSection = () => {
    const Colors = useColors();
    const onAddPressed = () => {};

    const onWithdrawPressed = () => {
        navigate('WithdrawToBank');
    };

    const onFundPressed = () => {
        navigate('FundWalletScreen');
    };

    const onExchangePressed = () => {
        navigate('SwapScreen');
    };

    const onReceivePressed = () => {
        navigate('ReceiveTypeScreen');
    };

    const actions: IAction[] = [
        {
            label: 'Fund wallet',
            icon: 'ic-account-wallet',
            onPress: onFundPressed,
            backgroundColor: Colors.green8,
        },
        {
            label: 'Receive',
            icon: 'ic-receive',
            onPress: onReceivePressed,
            backgroundColor: Colors.green8,
        },
        {
            label: 'Withdraw',
            icon: 'ic-withdraw',
            onPress: onWithdrawPressed,
            backgroundColor: Colors.green8,
        },
        {
            label: 'Exchange',
            icon: 'ic-exchange',
            onPress: onExchangePressed,
            backgroundColor: Colors.green8,
        },
    ];

    const renderItemAction = (action: IAction) => {
        return (
            <ViewItem key={action.label} onPress={action.onPress}>
                <ViewIcon background={action.backgroundColor}>
                    <SVGIcon name={action.icon} size={scales(24)} />
                </ViewIcon>
                <Label type="m_10_15">{action.label}</Label>
            </ViewItem>
        );
    };

    return <Wrapper>{actions.map(renderItemAction)}</Wrapper>;
};

export default ActionSection;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 24px ${scales(16)}px;
    gap: ${scales(12)}px;
`;

const ViewItem = styled.TouchableOpacity`
    flex: 1;
    background-color: ${(p) => p.theme.white};
    border-radius: ${scales(8)}px;
    padding: ${scales(8)}px 0px;
    align-items: center;
`;

const ViewIcon = styled.View<{background: string}>`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${scales(12)}px;
    background-color: ${(p) => p.background};
`;

const Label = styled(Text)``;
