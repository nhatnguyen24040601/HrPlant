import React, {useContext, useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import Config from 'react-native-config';
import {SvgUri} from 'react-native-svg';
import styled from 'styled-components/native';

import {SendTransactionContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import {useColors} from 'theme/provider/ThemeProvider';
import {formatNumberInput} from 'utils';

const LocalTransfer = () => {
    const Colors = useColors();
    const {currency, setCurrency, amount, setAmount} = useContext(SendTransactionContext);
    const [shouldHideFree, setShouldHideFree] = useState(false);

    const shouldDisableSubmit = useMemo(() => {
        return !currency || !amount;
    }, [currency, amount]);

    const onStartShouldSetResponder = () => {
        Keyboard.dismiss();
        return true;
    };

    const onHideFreePressed = () => {
        setShouldHideFree(true);
    };

    const onChangeAmount = (text: string) => {
        const formatText = text.replace(/[,]/g, '');
        setAmount(formatText);
    };

    const onSelectCurrencyPressed = () => {
        navigate('SelectCurrenciesScreen', {onSelectCurrency: setCurrency});
    };

    const onSubmitPressed = () => {
        navigate('RecipientScreen');
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

    const renderInputAmount = () => {
        return (
            <ViewAmount>
                <ViewHeaderAmount>
                    <TextLabel type="m_10_12">Amount your sending</TextLabel>
                    {/* <ViewBalance>
                        <SVGIcon name="ic-balance-wallet" size={scales(14)} color={Colors.grey1} />
                        <Balance type="m_10_12">0 {currency?.code}</Balance>
                    </ViewBalance> */}
                </ViewHeaderAmount>
                <ViewInput>
                    <InputAmount
                        keyboardType="number-pad"
                        value={formatNumberInput(amount)}
                        onChangeText={onChangeAmount}
                        textAlign="left"
                        placeholder="0"
                        placeholderTextColor={Colors.black1}
                    />
                    <SelectCountry onPress={onSelectCurrencyPressed}>
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
                    <ValueFee type="m_12_18">- 0 {currency?.code}</ValueFee>
                </ViewItemFee>
                <ViewItemFee>
                    <LabelFee style={{color: Colors.black1}} type="r_12_18">
                        Amount we will send
                    </LabelFee>
                    <ValueFee type="s_12_18">
                        {formatNumberInput(amount) || '0'} {currency?.code}
                    </ValueFee>
                </ViewItemFee>
            </ViewFee>
        );
    };

    return (
        <Wrapper onStartShouldSetResponder={onStartShouldSetResponder}>
            <Content>
                {!shouldHideFree && renderNotiFree()}
                {renderInputAmount()}
                {renderFee()}
            </Content>
            <ButtonSubmit text="Continue" onPress={onSubmitPressed} disabled={shouldDisableSubmit} />
        </Wrapper>
    );
};

export default LocalTransfer;

const Wrapper = styled.View`
    flex: 1;
    padding: 0px ${scales(24)}px;
`;

const Content = styled.View`
    flex: 1;
    padding-top: ${scales(24)}px;
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
    margin-top: ${scales(20)}px;
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
