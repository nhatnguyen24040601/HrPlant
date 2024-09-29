import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import Text from 'components/Text';
import React from 'react';
import styled from 'styled-components/native';
import {scales} from 'theme/CommonSize';
import BalanceSection from './BalanceSection';
import {navigate} from 'navigation/src/utils';
import {useColors} from 'theme/provider/ThemeProvider';

interface IAction {
    label: string;
    icon: TNameOfIconSVG;
    onPress: () => void;
    backgroundColor: string;
}

interface IProps {
    wallet: wallet.IWallet;
}

const WalletInfoSection = (props: IProps) => {
    const Colors = useColors();
    const {wallet} = props;

    const onAddPressed = () => {};

    const onFundPressed = () => {
        navigate('FundWalletScreen');
    };

    const onReceivePressed = () => {
        navigate('ReceiveTypeScreen');
    };

    const actions: IAction[] = [
        {
            label: 'Fund',
            icon: 'ic-fund',
            onPress: onFundPressed,
            backgroundColor: Colors.green8,
        },
        {
            label: 'Send',
            icon: 'ic-send-action',
            onPress: onAddPressed,
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
            onPress: onAddPressed,
            backgroundColor: Colors.green8,
        },
        {
            label: 'Exchange',
            icon: 'ic-exchange',
            onPress: onAddPressed,
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

    const renderActions = () => {
        return <WrapActions>{actions.map(renderItemAction)}</WrapActions>;
    };

    return (
        <>
            <Wrapper>
                <SBalanceSection wallet={wallet} />
                {renderActions()}
            </Wrapper>
            <Line />
        </>
    );
};

export default WalletInfoSection;

const Wrapper = styled.View`
    padding: ${scales(16)}px ${scales(16)}px ${scales(32)}px ${scales(16)}px;
`;

const SBalanceSection = styled(BalanceSection)`
    width: 100%;
`;

const WrapActions = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: ${scales(24)}px;
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

const Line = styled.View`
    width: 100%;
    height: ${scales(16)}px;
    background-color: ${(p) => p.theme.grey12};
`;
