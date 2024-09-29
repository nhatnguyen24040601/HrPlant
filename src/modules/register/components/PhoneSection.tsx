import React, {useContext, useEffect, useState} from 'react';
import Config from 'react-native-config';
import styled from 'styled-components/native';

import {registerValidate, resendOTP} from '../src/api';
import {RegisterProgress} from '../src/constants';
import {RegisterContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import {useColors} from 'theme/provider/ThemeProvider';
import {TypeOTP} from 'utils/enum';

const PhoneSection = () => {
    const {setProgress, setPhone: setPhoneContext, country} = useContext(RegisterContext);
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countryPhone, setCountryPhone] = useState<register.ICountry>();
    const Colors = useColors();

    useEffect(() => {
        if (country) {
            setCountryPhone(country);
        }
    }, [country]);

    const onSelectCountry = (countrySelected: register.ICountry) => {
        setCountryPhone(countrySelected);
    };

    const onSelectCountryPressed = () => {
        navigate('SelectCountriesScreen', {onSelectCountry});
    };

    const sendOtp = () => {
        resendOTP({object: phone.toLowerCase(), type: TypeOTP.PHONE})
            .then(() => {
                setPhoneContext(`${countryPhone.dialingCode}${phone}`);
                setProgress(RegisterProgress.VerifyPhone);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    };

    const verifyPhone = () => {
        registerValidate({
            Type: TypeOTP.PHONE,
            Phone: phone,
        })
            .then(() => {
                sendOtp();
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    };

    const onNextPressed = () => {
        verifyPhone();
    };

    const onFocus = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const onChangePhone = (text) => {
        setPhone(text);
    };

    const renderInputPhone = () => {
        return (
            <WrapInput>
                <SelectCountry onPress={onSelectCountryPressed}>
                    {countryPhone && <Flag source={{uri: `${Config.API_URL}${countryPhone.image}`}} />}
                    <Code type="m_14_16">+{countryPhone?.dialingCode}</Code>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                </SelectCountry>
                <Input
                    focus={focus}
                    placeholder="Enter phone number"
                    onChangeText={onChangePhone}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    keyboardType="number-pad"
                />
            </WrapInput>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_28_34">Enter phone number</Title>
                <Description type="r_14_17">Please enter your telephone number</Description>
                <Label>Phone Number</Label>
                {renderInputPhone()}
            </Content>
            {error && <TextError type="r_10_12">{error}</TextError>}
            <ButtonNext text="Next" disabled={!phone} onPress={onNextPressed} loading={loading} />
        </Wrapper>
    );
};

export default PhoneSection;

const Wrapper = styled.View`
    flex: 1;
    width: ${CommonSize.scrWidth}px;
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
`;

const Title = styled(Text)``;

const Description = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-top: ${scales(8)}px;
`;

const Label = styled(Text)`
    margin-top: ${scales(32)}px;
    margin-bottom: ${scales(8)}px;
`;

const Content = styled.View`
    flex: 1;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;

const WrapInput = styled.View`
    width: 100%;
    flex-direction: row;
    border-collapse: collapse;
`;

const SelectCountry = styled.TouchableOpacity`
    background-color: ${(p) => p.theme.grey6};
    padding: ${scales(16)}px ${scales(12)}px;
    flex-direction: row;
    align-items: center;
    gap: ${scales(6)}px;
    border-width: ${scales(2)}px;
    border-color: ${(p) => p.theme.grey7};
    border-top-left-radius: ${scales(8)}px;
    border-bottom-left-radius: ${scales(8)}px;
    border-right-width: 0px;
`;

const Input = styled(TextInput)<{focus: boolean}>`
    flex: 1;
    border-top-right-radius: ${scales(8)}px;
    border-bottom-right-radius: ${scales(8)}px;
    border-width: ${scales(2)}px;
    border-color: ${(p) => (p.focus ? p.theme.green2 : p.theme.grey7)};
    background-color: ${(p) => (p.focus ? p.theme.white : p.theme.grey6)};
    height: 100%;
    font-size: ${scales(14)}px;
    line-height: ${scales(16)}px;
    ${Fonts.medium}
    padding: 0px ${scales(16)}px;
`;

const Code = styled(Text)``;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const TextError = styled(Text)`
    margin-bottom: ${scales(10)}px;
    color: ${(p) => p.theme.red1};
`;
