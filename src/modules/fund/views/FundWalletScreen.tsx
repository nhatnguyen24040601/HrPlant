import React, {useRef, useState} from 'react';
import Config from 'react-native-config';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';

import GlobalSubmitButton from 'components/GlobalSubmitButton';
import ModalSelectPaymentMethod, {IHandleSelectPaymentMethod} from 'components/ModalSelectPaymentMethod';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {navigate} from 'navigation/src/utils';
import { getColors } from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import { useColors } from 'theme/provider/ThemeProvider';
import {formatNumberInput} from 'utils';

const FundWalletScreen = () => {
    const Colors = useColors();
    const [currency, setCurrency] = useState<addWallet.ICurrency>();
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<transaction.IPaymentMethod>();

    const selectPaymentMethodRef = useRef<IHandleSelectPaymentMethod>();

    const onSelectCurrencyPressed = () => {
        navigate('SelectCurrenciesScreen', {onSelectCurrency: setCurrency});
    };

    const onChangeAmount = (text: string) => {
        const formatText = text.replace(/[,]/g, '');
        setAmount(formatText);
    };

    const onSelectPaymentMethod = () => {
        selectPaymentMethodRef.current.showModal(setPaymentMethod);
    };

    const renderInputAmount = () => {
        return (
            <ViewAmount>
                <ViewHeaderAmount>
                    <TextLabel type="m_10_12">Amount your sending</TextLabel>
                    <ViewBalance>
                        <SVGIcon name="ic-balance-wallet" size={scales(14)} color={Colors.grey1} />
                        <Balance type="m_10_12">5,000.56 GBP</Balance>
                    </ViewBalance>
                </ViewHeaderAmount>
                <ViewInput>
                    <SelectCountry onPress={onSelectCurrencyPressed}>
                        {currency && <Flag source={{uri: `${Config.API_URL}${currency.image}`}} />}
                        <CountrySymbol type="m_14_16">{currency ? currency.code : 'Select'}</CountrySymbol>
                        <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                    </SelectCountry>
                    <InputAmount
                        keyboardType="number-pad"
                        value={formatNumberInput(amount)}
                        onChangeText={onChangeAmount}
                        textAlign="right"
                        placeholder="0"
                        placeholderTextColor={Colors.black1}
                    />
                </ViewInput>
            </ViewAmount>
        );
    };

    const renderFee = () => {
        return (
            <ViewFee>
                <ViewItemFee>
                    <LabelFee type="r_12_18">Send Fee</LabelFee>
                    <ValueFee type="m_12_18">- 0 GBP</ValueFee>
                </ViewItemFee>
                <ViewItemFee>
                    <LabelFee type="r_12_18">Amount we will send</LabelFee>
                    <ValueFee type="s_12_18">= {formatNumberInput(amount) || 0} GBP</ValueFee>
                </ViewItemFee>
            </ViewFee>
        );
    };

    const renderPaymentMethod = () => {
        return (
            <SelectPaymentMethod onPress={onSelectPaymentMethod}>
                <ViewIconAdd>
                    <SVGIcon name={paymentMethod?.icon || 'ic-plus'} size={scales(20)} color={Colors.green2} />
                </ViewIconAdd>
                <PaymentMethod type="m_14_17">{paymentMethod?.name || 'Select payment method'}</PaymentMethod>
                <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
            </SelectPaymentMethod>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Fund wallet" containerStyle={toStyleSheet(headerStyle)} />
            <Content>
                <Title type="s_20_26">How much do you want to add to your wallet?</Title>
                {renderInputAmount()}
                {renderFee()}
                {renderPaymentMethod()}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Continue" disabled={!amount || !paymentMethod || !currency} />
            </ViewBottom>
            <ModalSelectPaymentMethod ref={selectPaymentMethodRef} />
        </Wrapper>
    );
};

export default FundWalletScreen;

const headerStyle = css`
    background-color: ${getColors().white};
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${p => p.theme.grey12};
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
`;

const ViewAmount = styled.View`
    padding: ${scales(20)}px ${scales(16)}px;
    background-color: ${p => p.theme.white};
    border-radius: ${scales(6)}px;
    gap: ${scales(20)}px;
    border-width: ${scales(1)}px;
    border-color: ${p => p.theme.grey13};
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ViewHeaderAmount = styled(Row)`
    justify-content: space-between;
`;

const TextLabel = styled(Text)``;

const ViewBalance = styled(Row)`
    gap: ${scales(4)}px;
`;

const Balance = styled(Text)`
    color: ${p => p.theme.grey1};
`;

const ViewInput = styled(Row)`
    gap: ${scales(20)}px;
`;

const SelectCountry = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(4)}px;
`;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const CountrySymbol = styled(Text)``;

const InputAmount = styled(TextInput)`
    flex: 1;
    font-size: ${scales(24)}px;
    line-height: ${scales(30)}px;
    ${Fonts.semiBold}
`;

const Title = styled(Text)`
    margin-bottom: ${scales(24)}px;
`;

const ViewFee = styled.View`
    gap: ${scales(12)}px;
    margin-top: ${scales(20)}px;
`;

const ViewItemFee = styled(Row)`
    justify-content: space-between;
`;

const LabelFee = styled(Text)`
    color: ${p => p.theme.black};
`;

const ValueFee = styled(Text)`
    color: ${p => p.theme.black};
`;

const SelectPaymentMethod = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${p => p.theme.white};
    padding: ${scales(16)}px;
    border-radius: ${scales(8)}px;
    margin-top: ${scales(24)}px;
    gap: ${scales(12)}px;
`;

const ViewIconAdd = styled.View`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    background-color: ${p => p.theme.grey3};
    justify-content: center;
    align-items: center;
`;

const PaymentMethod = styled(Text)`
    flex: 1;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${p => p.theme.grey15};
    border-top-width: ${scales(1)}px;
    border-top-color: ${p => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;
