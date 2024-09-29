import React, {useContext, useRef, useState} from 'react';
import Collapsible from 'react-native-collapsible';
import Config from 'react-native-config';
import {SvgUri} from 'react-native-svg';
import styled from 'styled-components/native';

import {sendWalletToWallet} from '../src/api';

import {SendTransactionContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import SelectWallet, {IHandleSelectWallet} from 'components/SelectWallet';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const PayWithWallet = () => {
    const Colors = useColors();
    const selectWalletRef = useRef<IHandleSelectWallet>();

    const {amount, receiver} = useContext(SendTransactionContext);
    const [wallet, setWallet] = useState<wallet.IWallet>();
    const [loading, setLoading] = useState(false);

    const onContinuePressed = async () => {
        // try {
        //     setLoading(true);
        //     await sendWalletToWallet({
        //         amount: Number(amount),
        //         amountGBP: 0,
        //         notes: '',
        //         receiverWalletId: receiver.walletId,
        //         senderWalletId: wallet.id,
        //     });
        //     setLoading(false);
        // } catch (error) {
        //     setLoading(false);
        // }
        // navigate('PaymentResultScreen');
        navigate('TransactionPasscode')
    };

    const onSelectWallet = (walletSelected: wallet.IWallet) => {
        setWallet(walletSelected);
    };

    const onShowWallets = () => {
        selectWalletRef.current.show();
    };

    const renderSelect = ({label, value}: {label: string; value: wallet.IWallet}) => {
        return (
            <ViewSelect>
                <ViewPosition>
                    <ViewCollapse collapsed={!wallet}>
                        <ViewWarningBalance>
                            <SVGIcon name="ic-warning" size={scales(20)} color={Colors.white} />
                            <TextWarningBalance type="m_12_18">
                                You have 50,000.00 NGN remaining in your balance{' '}
                            </TextWarningBalance>
                        </ViewWarningBalance>
                    </ViewCollapse>
                </ViewPosition>
                <Label type="m_14_17">{label}</Label>
                <ButtonSelect onPress={onShowWallets} activeOpacity={1}>
                    {wallet && <Flag source={{uri: `${Config.API_URL}${wallet.image}`}} />}
                    <TextCurrency type="m_14_17">{value?.name || 'Select Wallet'}</TextCurrency>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                </ButtonSelect>
            </ViewSelect>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Pay with wallet" />
            <Content>
                <Title type="s_20_26">Your wallet</Title>
                {renderSelect({label: 'Select wallet', value: wallet})}
            </Content>
            <ButtonContinue text="Continue" onPress={onContinuePressed} disabled={!wallet} loading={loading} />
            <SelectWallet ref={selectWalletRef} onSelectWallet={onSelectWallet} />
        </Wrapper>
    );
};

export default PayWithWallet;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
    gap: ${scales(20)}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(4)}px;
`;

const Label = styled(Text)``;

const ButtonSelect = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(p) => p.theme.grey7};
    border-radius: ${scales(8)}px;
    gap: ${scales(8)}px;
    padding: ${scales(16)}px;
`;

const TextCurrency = styled(Text)`
    color: ${(p) => p.theme.grey1};
    flex: 1;
`;

const ViewSelect = styled.View`
    gap: ${scales(8)}px;
`;

const ButtonContinue = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const ViewPosition = styled.View`
    position: absolute;
    bottom: -${scales(40)}px;
    width: 100%;
    height: ${scales(50)}px;
`;

const ViewWarningBalance = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: ${scales(8)}px;
    padding: ${scales(13)}px ${scales(8)}px;
    border-radius: ${scales(8)}px;
    width: 100%;
    height: ${scales(50)}px;
    background-color: ${(p) => p.theme.green11};
`;

const ViewCollapse = styled(Collapsible)``;

const TextWarningBalance = styled(Text)`
    color: ${(p) => p.theme.white};
`;
