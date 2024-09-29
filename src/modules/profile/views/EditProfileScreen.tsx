import React, {useState} from 'react';
import Config from 'react-native-config';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import SVGIcon from 'assets/svg';
import Avatar from 'components/Avatar';
import GlobalHeader from 'components/GlobalHeader';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import {goBack, navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';
import {useColors} from 'theme/provider/ThemeProvider';

const EditProfileScreen = () => {
    const Colors = useColors();
    const [firstName, setFirstName] = useState('');
    const [countryPrefix, setCountryPrefix] = useState<register.ICountry>(null);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [focus, setFocus] = useState(false);

    const renderInput = ({
        label,
        value,
        setValue,
    }: {
        label: string;
        value: string;
        setValue: (value: string) => void;
    }) => {
        return (
            <>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput value={value} onChangeText={setValue} />
            </>
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
            <>
                <Label type="m_14_17">{label}</Label>
                <ButtonSelect onPress={() => {}}>
                    <TextCountry type="m_14_17">{value}</TextCountry>
                    <SVGIcon name="ic-chevron-down" size={scales(20)} color={Colors.black1} />
                </ButtonSelect>
            </>
        );
    };

    const onFocus = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const onChangePhone = (text: string) => {
        setPhone(text);
    };

    const onSelectCountry = (countrySelected: register.ICountry) => {
        setCountryPrefix(countrySelected);
    };

    const onSelectCountryPressed = () => {
        navigate('SelectCountriesScreen', {onSelectCountry});
    };

    const onEditPressed = () => {
        goBack();
    };

    const renderViewAvatar = () => {
        return (
            <>
                <Avatar size={scales(80)} />
                <ButtonChangeAvatar>
                    <TextChangeAvatar type="s_14_17">Change profile picture</TextChangeAvatar>
                </ButtonChangeAvatar>
            </>
        );
    };

    const renderInputPhone = () => {
        return (
            <>
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
            </>
        );
    };

    const renderInformationSection = () => {
        return (
            <ViewWrapSection>
                <SectionName type="m_14_17">Personal Information</SectionName>
                {renderInput({label: 'First Name', setValue: setFirstName, value: firstName})}
                {renderInput({label: 'Last Name', setValue: setFirstName, value: firstName})}
                {renderInput({label: 'Email Address', setValue: setFirstName, value: firstName})}
                {renderInputPhone()}
            </ViewWrapSection>
        );
    };

    const renderAddressSection = () => {
        return (
            <ViewWrapSection>
                <SectionName type="m_14_17">Address</SectionName>
                {renderSelect({label: 'Country', setValue: setCountry, value: country})}
                {renderSelect({label: 'City', setValue: setCity, value: city})}
                {renderInput({label: 'House Address', setValue: setFirstName, value: firstName})}
                {renderInput({label: 'Portal Code', setValue: setFirstName, value: firstName})}
            </ViewWrapSection>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Profile Information" showBorder />
            <Content contentContainerStyle={toStyleSheet(contentList)}>
                {renderViewAvatar()}
                {renderInformationSection()}
                {renderAddressSection()}
            </Content>
            <ButtonEdit text="Save changes" onPress={onEditPressed} />
        </Wrapper>
    );
};

export default EditProfileScreen;

const contentList = css`
    align-items: center;
    padding: ${scales(16)}px;
    gap: ${scales(24)}px;
`;

const Wrapper = styled.View`
    flex: 1;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const Content = styled.ScrollView`
    flex: 1;
`;

const ViewWrapSection = styled.View`
    gap: ${scales(16)}px;
    width: 100%;
`;

const SectionName = styled(Text)`
    color: ${(p) => p.theme.grey8};
`;

const Label = styled(Text)`
    flex: 1;
`;

const ButtonEdit = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;

const ButtonChangeAvatar = styled.TouchableOpacity`
    background-color: ${(p) => p.theme.grey6};
    padding: ${scales(4)}px;
    border-radius: ${scales(4)}px;
`;

const TextChangeAvatar = styled(Text)``;

const WrapInputPhone = styled.View`
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

const ButtonSelect = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(p) => p.theme.grey7};
    border-radius: ${scales(8)}px;
    gap: ${scales(8)}px;
    padding: ${scales(16)}px;
    margin-top: ${scales(8)}px;
`;

const TextCountry = styled(Text)`
    color: ${(p) => p.theme.grey1};
    flex: 1;
`;
