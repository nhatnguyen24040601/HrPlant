import React, {useMemo, useState} from 'react';

import {TextInput} from 'react-native';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';

import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import {formatNumber, formatNumberInput} from 'utils';
import {navigate} from 'navigation/src/utils';
import Config from 'react-native-config';
import {useColors} from 'theme/provider/ThemeProvider';

interface IInputAmountProps {
    currency: addWallet.ICurrency;
    setCurrency: (currency: addWallet.ICurrency) => void;
    amount: string;
    onChangeAmount: (amount: string) => void;
    label: string;
    balance?: string;
    disabled?: boolean;
}

const InternationalTransfer = () => {
    const Colors = useColors();
    const [amountFrom, setAmountFrom] = useState('');
    const [currencyFrom, setCurrencyFrom] = useState<addWallet.ICurrency>();
    const [amountTo, setAmountTo] = useState('');
    const [currencyTo, setCurrencyTo] = useState<addWallet.ICurrency>();
    const [shouldHideFree, setShouldHideFree] = useState(false);

    const shouldDisableSubmit = useMemo(() => {
        return !currencyFrom || !amountFrom || !currencyTo;
    }, [currencyFrom, amountFrom, currencyTo]);

    const onSubmitPressed = () => {
        // navigate('RecipientScreen');
    };

    const onSelectCurrencyPressed = (setCurrency: (currency: addWallet.ICurrency) => void) => {
        navigate('SelectCurrenciesScreen', {onSelectCurrency: setCurrency});
    };

    const onHideFreePressed = () => {
        setShouldHideFree(true);
    };

    const onChangeAmountFrom = (text: string) => {
        const formatText = text.replace(/[,]/g, '');
        setAmountFrom(formatText);
    };

    const renderNotiFree = () => {
        return (
            <ViewFree>
                <SVGIcon name="ic-rocket" size={scales(24)} color={Colors.green10} />
                <TextFree type="m_12_18">Your first three (3) transfers are FREE!!!</TextFree>
                <Button onPress={onHideFreePressed}>
                    <SVGIcon name="ic-x" size={scales(24)} color={Colors.black1} />
                </Button>
            </ViewFree>
        );
    };

    const renderInputAmount = ({
        amount,
        onChangeAmount,
        currency,
        setCurrency,
        label,
        balance,
        disabled,
    }: IInputAmountProps) => {
        return (
            <ViewAmount>
                <ViewHeaderAmount>
                    <TextLabel type="m_10_12">{label}</TextLabel>
                    {/* <ViewBalance>
                        <SVGIcon name="ic-balance-wallet" size={scales(14)} color={Colors.grey1} />
                        <Balance type="m_10_12">
                            {formatNumber(balance)} {currency?.code}
                        </Balance>
                    </ViewBalance> */}
                </ViewHeaderAmount>
                <ViewInput>
                    <InputAmount
                        editable={!disabled}
                        keyboardType="number-pad"
                        value={formatNumberInput(amount)}
                        onChangeText={onChangeAmount}
                        placeholder="0"
                        placeholderTextColor={Colors.black1}
                    />
                    <SelectCountry onPress={() => onSelectCurrencyPressed(setCurrency)}>
                        {currency && <Flag source={{uri: `${Config.API_URL}${currency.image}`}} />}
                        <CountrySymbol type="m_14_16">{currency ? currency.code : 'Select'}</CountrySymbol>
                        <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                    </SelectCountry>
                </ViewInput>
            </ViewAmount>
        );
    };

    const renderFee = () => {
        return (
            <ViewFee>
                <ViewItemFee>
                    <LabelFee type="r_12_18">Send Fee</LabelFee>
                    <ValueFee type="m_12_18">- 0 {currencyFrom?.code}</ValueFee>
                </ViewItemFee>
                <ViewItemFee>
                    <LabelFee style={{color: Colors.black1}} type="r_12_18">
                        Amount we will send
                    </LabelFee>
                    <ValueFee type="s_12_18">
                        {formatNumberInput(amountFrom) || '0'} {currencyFrom?.code}
                    </ValueFee>
                </ViewItemFee>
                <ViewItemFee>
                    <LabelFee type="r_12_18">Today’s rate</LabelFee>
                    <ValueFee type="s_12_18">
                        {!currencyFrom || !currencyTo ? '--' : `1 ${currencyFrom.code} = 1.395 ${currencyTo.code}`}
                    </ValueFee>
                </ViewItemFee>
            </ViewFee>
        );
    };

    return (
        <Wrapper>
            <Content>
                {!shouldHideFree && renderNotiFree()}
                {renderInputAmount({
                    amount: amountFrom,
                    onChangeAmount: onChangeAmountFrom,
                    currency: currencyFrom,
                    setCurrency: setCurrencyFrom,
                    label: 'Amount you are sending',
                })}
                {renderFee()}
                {renderInputAmount({
                    amount: amountTo,
                    onChangeAmount: () => {},
                    currency: currencyTo,
                    setCurrency: setCurrencyTo,
                    label: 'Amount recipient receives',
                    disabled: true,
                })}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Continue" disabled={shouldDisableSubmit} onPress={onSubmitPressed} />
            </ViewBottom>
        </Wrapper>
    );
};

export default InternationalTransfer;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(24)}px ${scales(16)}px;
`;

const ViewFree = styled.View`
    padding: ${scales(12)}px;
    background-color: ${(p) => p.theme.green9};
    border-radius: ${scales(8)}px;
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
    margin-bottom: ${scales(24)}px;
`;

const TextFree = styled(Text)`
    flex: 1;
`;

const Button = styled.TouchableOpacity``;

const ViewAmount = styled.View`
    padding: ${scales(20)}px ${scales(16)}px;
    background-color: ${(p) => p.theme.grey6};
    border-radius: ${scales(6)}px;
    gap: ${scales(20)}px;
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey13};
    margin-bottom: ${scales(20)}px;
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
    color: ${(p) => p.theme.grey1};
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

const ViewFee = styled.View`
    gap: ${scales(12)}px;
    margin-bottom: ${scales(20)}px;
`;

const ButtonSubmit = styled(GlobalSubmitButton)`
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const ViewItemFee = styled(Row)`
    justify-content: space-between;
`;

const LabelFee = styled(Text)`
    color: ${(p) => p.theme.grey1};
`;

const ValueFee = styled(Text)`
    color: ${(p) => p.theme.black1};
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${(p) => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${(p) => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;
