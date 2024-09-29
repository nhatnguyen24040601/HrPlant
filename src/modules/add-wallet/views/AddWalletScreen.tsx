import React, {useEffect, useRef, useState} from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';

import CreateSuccess, {IHandleShowSuccess} from '../components/CreateSuccess';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const AddWalletScreen = () => {
    const Colors = useColors();
    const [currency, setCurrency] = useState<addWallet.ICurrency>();
    const [error, setError] = useState('');
    const showCreateSuccessRef = useRef<IHandleShowSuccess>();

    useEffect(() => {
        setError('');
    }, [currency]);

    const onSelectCurrency = (currencySelected: addWallet.ICurrency) => {
        setCurrency(currencySelected);
    };

    const onSelectCurrencyPressed = () => {
        navigate('SelectCurrenciesScreen', {onSelectCurrency});
    };

    const onAddPressed = async () => {
        if (currency.hasWallet) {
            setError('You already have wallet with this currency');
            return;
        }
        showCreateSuccessRef.current.showModal(currency.id);
    };

    return (
        <Wrapper>
            <GlobalHeader text="Add new wallet" showBorder />
            <ViewTitle>
                <ViewIcon>
                    <SVGIcon name="ic-create-wallet" width={scales(137)} height={scales(91)} />
                </ViewIcon>
                <Title type="b_20_26">Hold any wallet of any currency</Title>
                <Desc type="r_12_18">{`Cadawada allows you to hold wallets of any\ncurrency of different countries`}</Desc>
            </ViewTitle>
            <ViewSupport>
                <TextSelect type="m_14_17">Select the wallet the currency will hold</TextSelect>
                <ButtonSelect onPress={onSelectCurrencyPressed}>
                    <Row>
                        {currency && <Flag source={{uri: `${Config.API_URL}${currency.image}`}} />}
                        <TextButton type="m_14_17">{currency?.name || 'Select currency'}</TextButton>
                    </Row>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.grey11} />
                </ButtonSelect>
                <ButtonSubmit text="Add wallet" onPress={onAddPressed} disabled={!currency} />
                {error && <TextError type="r_10_12">{error}</TextError>}
            </ViewSupport>
            <CreateSuccess ref={showCreateSuccessRef} />
        </Wrapper>
    );
};

export default AddWalletScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Title = styled(Text)`
    color: ${(p) => p.theme.green1};
    margin-bottom: ${scales(8)}px;
`;

const ViewTitle = styled.View`
    margin: ${scales(42)}px ${scales(32)}px ${scales(67)}px ${scales(32)}px;
`;

const Desc = styled(Text)`
    color: ${(p) => p.theme.black};
`;

const TextSelect = styled(Text)`
    margin-bottom: ${scales(8)}px;
`;

const TextButton = styled(Text)`
    color: ${(p) => p.theme.grey1};
`;

const ButtonSelect = styled.TouchableOpacity`
    height: ${scales(52)}px;
    padding: 0px ${scales(16)}px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${(p) => p.theme.grey6};
    border-color: ${(p) => p.theme.grey7};
    border-width: ${scales(1)}px;
    margin-bottom: ${scales(24)}px;
    border-radius: ${scales(8)}px;
`;

const ViewSupport = styled.View`
    padding: 0px ${scales(24)}px;
`;

const ButtonSubmit = styled(GlobalSubmitButton)``;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    margin-right: ${scales(10)}px;
`;

const ViewIcon = styled.View`
    position: absolute;
    bottom: -${scales(50)}px;
    right: -${scales(10)}px;
`;

const TextError = styled(Text)`
    margin-top: ${scales(6)}px;
    color: ${(p) => p.theme.red1};
`;
