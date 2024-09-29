import React, {useState} from 'react';
import styled from 'styled-components/native';

import GlobalHeader from 'components/GlobalHeader';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import GlobalInput from 'components/GlobalInput';
import SVGIcon from 'assets/svg';
import {TextInput} from 'react-native';
import Fonts from 'theme/Fonts';
import {navigate} from 'navigation/src/utils';
import Config from 'react-native-config';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import { useColors } from 'theme/provider/ThemeProvider';

interface IItemInput {
    label: string;
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

const MobileMoney = () => {
    const Colors = useColors()
    const [accountName, setAccountName] = useState('');
    const [network, setNetwork] = useState('Select network');
    const [countryPrefix, setCountryPrefix] = useState<register.ICountry>(null);
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);

    const onSelectCountry = (countrySelected: register.ICountry) => {
        setCountryPrefix(countrySelected);
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

    const renderInputPhone = () => {
        return (
            <ViewItem>
                <Label type="m_14_17">Phone Number</Label>
                <WrapInputPhone>
                    <SelectCountry onPress={onSelectCountryPressed}>
                        {countryPrefix && <Flag source={{uri: `${Config.API_URL}${countryPrefix.image}`}} />}
                        <Code type="m_14_16">{countryPrefix ? ` +${countryPrefix?.dialingCode}` : 'Select'}</Code>
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
                </WrapInputPhone>
            </ViewItem>
        );
    };

    const renderSelect = ({
        label,
        value,
        setValue,
    }: {
        label: string;
        value: string;
        setValue: (value: string) => void;
    }) => {
        return (
            <ViewItem>
                <Label type="m_14_17">{label}</Label>
                <ButtonSelect onPress={() => {}}>
                    <TextButtonSelect type="m_14_17">{value}</TextButtonSelect>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                </ButtonSelect>
            </ViewItem>
        );
    };

    const renderInput = ({label, value, setValue, placeholder}: IItemInput) => {
        return (
            <ViewItem>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    keyboardType="number-pad"
                />
            </ViewItem>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Send to mobile number" />
            <Content>
                <Title type="s_20_26">Enter recipient’s mobile money information</Title>
                {renderInputPhone()}
                {renderSelect({label: 'Network', setValue: setNetwork, value: network})}
                {renderInput({
                    label: 'Account Name',
                    setValue: setAccountName,
                    value: accountName,
                    placeholder: 'Enter account name',
                })}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Continue" />
            </ViewBottom>
        </Wrapper>
    );
};

export default MobileMoney;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    padding: ${scales(16)}px;
    gap: ${scales(24)}px;
    flex: 1;
`;

const Title = styled(Text)``;

const ViewItem = styled.View`
    gap: ${scales(8)}px;
`;

const Label = styled(Text)``;

const ButtonSelect = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${p => p.theme.grey6};
    border-radius: ${scales(8)}px;
    gap: ${scales(8)}px;
    padding: ${scales(16)}px;
    justify-content: space-between;

    border-width: ${scales(2)}px;
    border-color: ${p => p.theme.grey7};
`;

const TextButtonSelect = styled(Text)`
    color: ${p => p.theme.grey1};
`;

const WrapInputPhone = styled.View`
    width: 100%;
    flex-direction: row;
    border-collapse: collapse;
`;

const SelectCountry = styled.TouchableOpacity`
    background-color: ${p => p.theme.grey6};
    padding: ${scales(16)}px ${scales(12)}px;
    flex-direction: row;
    align-items: center;
    gap: ${scales(6)}px;
    border-width: ${scales(2)}px;
    border-color: ${p => p.theme.grey7};
    border-top-left-radius: ${scales(8)}px;
    border-bottom-left-radius: ${scales(8)}px;
    border-right-width: 0px;
`;

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

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const Code = styled(Text)``;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${p => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${p => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;
