import React, {useState} from 'react';
import styled from 'styled-components/native';

import GlobalHeader from 'components/GlobalHeader';

import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import SVGIcon from 'assets/svg';
import {navigate} from 'navigation/src/utils';
import Config from 'react-native-config';
import {formatNumber, formatNumberInput} from 'utils';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {useColors} from 'theme/provider/ThemeProvider';

interface IInputAmountProps {
    currency: addWallet.ICurrency;
    setCurrency: (currency: addWallet.ICurrency) => void;
    amount: string;
    onChangeAmount: (amount: string) => void;
    label: string;
    balance: string;
    disabled?: boolean;
}

const SwapScreen = () => {
    const Colors = useColors();
    const [amountFrom, setAmountFrom] = useState('');
    const [currencyFrom, setCurrencyFrom] = useState<addWallet.ICurrency>();
    const [amountTo, setAmountTo] = useState('');
    const [currencyTo, setCurrencyTo] = useState<addWallet.ICurrency>();

    const onSelectCurrencyPressed = (setCurrency: (currency: addWallet.ICurrency) => void) => {
        navigate('SelectCurrenciesScreen', {onSelectCurrency: setCurrency});
    };

    const onChangeAmountFrom = (text: string) => {
        const formatText = text.replace(/[,]/g, '');
        setAmountFrom(formatText);
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
                    <ViewBalance>
                        <SVGIcon name="ic-balance-wallet" size={scales(14)} color={Colors.grey1} />
                        <Balance type="m_10_12">
                            {formatNumber(balance)} {currency?.code}
                        </Balance>
                    </ViewBalance>
                </ViewHeaderAmount>
                <ViewInput>
                    <SelectCountry onPress={() => onSelectCurrencyPressed(setCurrency)}>
                        {currency && <Flag source={{uri: `${Config.API_URL}${currency.image}`}} />}
                        <CountrySymbol type="m_14_16">{currency ? currency.code : 'Select'}</CountrySymbol>
                        <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                    </SelectCountry>
                    <InputAmount
                        editable={!disabled}
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

    const renderViewSwap = () => {
        return (
            <ViewSwap>
                {renderInputAmount({
                    amount: amountFrom,
                    onChangeAmount: onChangeAmountFrom,
                    balance: '123123',
                    currency: currencyFrom,
                    setCurrency: setCurrencyFrom,
                    label: 'From',
                })}
                {renderInputAmount({
                    amount: amountTo,
                    onChangeAmount: () => {},
                    balance: '123456',
                    currency: currencyTo,
                    setCurrency: setCurrencyTo,
                    label: 'To',
                    disabled: true,
                })}
                <WrapIcon pointerEvents="box-none">
                    <Button>
                        <SVGIcon name="ic-swap" size={scales(32)} />
                    </Button>
                </WrapIcon>
            </ViewSwap>
        );
    };

    const renderItemFee = ({
        label,
        value,
        shouldShowWarning,
        shouldHightLight,
    }: {
        label: string;
        value: string;
        shouldShowWarning?: boolean;
        shouldHightLight?: boolean;
    }) => {
        return (
            <ViewItemFee>
                <ViewLabelFee>
                    <TextLabelFee type="r_12_18">{label}</TextLabelFee>
                    {shouldShowWarning && <SVGIcon name="ic-warning-circle" size={scales(14)} color={Colors.grey1} />}
                </ViewLabelFee>
                <TextValueFee type={shouldHightLight ? 's_12_18' : 'm_12_18'}>{value}</TextValueFee>
            </ViewItemFee>
        );
    };

    const renderFee = () => {
        return (
            <ViewFee>
                {renderItemFee({label: 'Exchange Fee', value: '- 0 GBP', shouldShowWarning: true})}
                {renderItemFee({label: 'Amount we will send', value: '= 0 GBP', shouldHightLight: true})}
                {renderItemFee({label: 'Today’s rate', value: '1 GBP = 1,3950 NGN', shouldHightLight: true})}
            </ViewFee>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Swap currencies" />
            <Content>
                {renderViewSwap()}
                <Line />
                {renderFee()}
                <ButtonSwap text="Swap" />
            </Content>
        </Wrapper>
    );
};

export default SwapScreen;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const Content = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.grey15};
    padding: ${scales(16)}px;
`;

const ViewAmount = styled.View`
    padding: ${scales(20)}px ${scales(16)}px;
    background-color: ${(p) => p.theme.white};
    border-radius: ${scales(6)}px;
    gap: ${scales(20)}px;
    border-width: ${scales(1)}px;
    border-color: ${(p) => p.theme.grey13};
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

const ViewSwap = styled.View`
    gap: ${scales(4)}px;
`;

const WrapIcon = styled.View`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    justify-content: center;
    align-items: center;
`;

const Button = styled.TouchableOpacity``;

const Line = styled.View`
    width: 100%;
    height: ${scales(1)}px;
    margin: ${scales(24)}px 0px;
    background-color: ${(p) => p.theme.grey16};
`;

const ViewItemFee = styled(Row)`
    justify-content: space-between;
`;

const ViewLabelFee = styled(Row)`
    gap: ${scales(4)}px;
`;

const TextLabelFee = styled(Text)`
    color: ${(p) => p.theme.black};
`;

const TextValueFee = styled(Text)`
    color: ${(p) => p.theme.black};
`;

const ViewFee = styled.View`
    gap: ${scales(12)}px;
`;

const ButtonSwap = styled(GlobalSubmitButton)`
    margin-top: ${scales(32)}px;
`;
