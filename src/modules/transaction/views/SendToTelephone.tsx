import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import Config from 'react-native-config';
import styled from 'styled-components/native';

import SendEmailOrPhoneSuccess, {IHandleSendEmailPhone} from '../components/SendEmailOrPhoneSuccess';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import {useColors} from 'theme/provider/ThemeProvider';

const SendToEmail = () => {
    const Colors = useColors();
    const sendEmailOrPhoneRef = useRef<IHandleSendEmailPhone>();
    const [country, setCountry] = useState<register.ICountry>(null);
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);

    const onSendPressed = () => {
        sendEmailOrPhoneRef.current.showModal({value: `+${country.dialingCode}${phone}`, type: 'phone'});
    };

    const onSelectCountry = (countrySelected: register.ICountry) => {
        setCountry(countrySelected);
    };

    const onSelectCountryPressed = () => {
        navigate('SelectCountriesScreen', {onSelectCountry});
    };

    const onChangePhone = (text: string) => {
        setPhone(text);
    };

    const onFocus = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const renderInput = () => {
        return (
            <ItemInput>
                <Label type="m_14_17">Phone number</Label>
                <WrapInput>
                    <SelectCountry onPress={onSelectCountryPressed}>
                        {country && <Flag source={{uri: `${Config.API_URL}${country.image}`}} />}
                        <Code type="m_14_16">{country ? ` +${country?.dialingCode}` : 'Select'}</Code>
                        <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                    </SelectCountry>
                    <InputPhone
                        value={phone}
                        focus={focus}
                        placeholder="Enter phone number"
                        onChangeText={onChangePhone}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        keyboardType="number-pad"
                    />
                </WrapInput>
            </ItemInput>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Send to phone number" />
            <Content>
                <Title type="s_20_26">Enter recipient’s phone number</Title>
                {renderInput()}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Send" disabled={!country || !phone} onPress={onSendPressed} />
            </ViewBottom>
            <SendEmailOrPhoneSuccess ref={sendEmailOrPhoneRef} />
        </Wrapper>
    );
};

export default SendToEmail;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(24)}px;
`;

const Label = styled(Text)``;

const ViewItem = styled.View`
    gap: ${scales(8)}px;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${(p) => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${(p) => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;

const ItemInput = styled.View`
    gap: ${scales(8)}px;
    margin-bottom: ${scales(20)}px;
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

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const Code = styled(Text)``;

const InputPhone = styled(TextInput)<{focus: boolean}>`
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
