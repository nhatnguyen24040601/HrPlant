import React, {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import Images from 'assets/images';
import SVGIcon from 'assets/svg';
import GlobalInput from 'components/GlobalInput';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {navigate, reset} from 'navigation/src/utils';
import Fonts from 'theme/Fonts';
import {Keyboard, StatusBar} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Config from 'react-native-config';
import {TypeLogin} from 'utils/enum';
import {useDispatch} from 'react-redux';
import {loginAction} from '../src/actions';
import TextInput from 'components/TextInput';
import {useColors} from 'theme/provider/ThemeProvider';

interface IItemInput {
    value: string;
    label: string;
    placeholder: string;
    isPassword?: boolean;
    onChangeText: (text: string) => void;
}

const LoginScreen = () => {
    const [typeLogin, setTypeLogin] = useState<TypeLogin>(TypeLogin.EMAIL);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [focus, setFocus] = useState(false);
    const [country, setCountry] = useState<register.ICountry>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const Colors = useColors();

    const dispatch = useDispatch();

    const shouldDisableLogin = useMemo(() => {
        if (typeLogin === TypeLogin.EMAIL) return !email || !password;
        return !phone || !password;
    }, [phone, password, email, typeLogin]);

    const onShowPassPressed = () => {
        setShowPass(!showPass);
    };

    const onLoginEmailPressed = () => {
        setFocus(false);
        Keyboard.dismiss();
        setTypeLogin(TypeLogin.EMAIL);
    };

    const onLoginPhonePressed = () => {
        setFocus(false);
        Keyboard.dismiss();
        setTypeLogin(TypeLogin.PHONE);
    };

    const onChangeEmail = (text: string) => {
        setEmail(text);
        setError('');
    };

    const onChangePassword = (text: string) => {
        setPassword(text);
        setError('');
    };

    const onChangePhone = (text: string) => {
        setPhone(text);
        setError('');
    };

    const onSignUpPressed = () => {
        navigate('RegisterScreen');
    };

    const onFocus = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const onSelectCountry = (countrySelected: register.ICountry) => {
        setCountry(countrySelected);
    };

    const onSelectCountryPressed = () => {
        navigate('SelectCountriesScreen', {onSelectCountry});
    };

    const onLoginPressed = async () => {
        setLoading(true);
        const data: login.ILoginRequestParams = {
            Password: password,
            type: TypeLogin.EMAIL,
        };
        if (typeLogin === TypeLogin.EMAIL) {
            data.Email = email.toLowerCase();
            data.type = TypeLogin.EMAIL;
        } else {
            data.Phone = phone;
            data.type = TypeLogin.PHONE;
        }
        dispatch(
            loginAction.request({
                data,
                onFail: (msg: string) => {
                    setLoading(false);
                    setError(msg);
                },
                onSuccess: () => {
                    setLoading(false);
                    reset('Main');
                },
            })
        );
    };

    const onStartShouldSetResponder = () => {
        Keyboard.dismiss();
        return true;
    };

    const renderAppName = () => {
        return (
            <ViewAppName>
                <SVGIcon name="ic-app" size={scales(24)} color={Colors.green1} />
                <Image source={Images.AppName} tintColor={Colors.black} />
            </ViewAppName>
        );
    };

    const renderShowPass = () => {
        return (
            <ButtonShowPass onPress={onShowPassPressed}>
                <SVGIcon name={showPass ? 'ic-eye-off' : 'ic-eye'} size={scales(24)} color={Colors.black1} />
            </ButtonShowPass>
        );
    };

    const renderTypeLogin = () => {
        return (
            <ViewType>
                <ButtonType onPress={onLoginEmailPressed}>
                    <WrapIndicator>
                        <Type selected={typeLogin === TypeLogin.EMAIL}>Email address</Type>
                        <Indicator selected={typeLogin === TypeLogin.EMAIL} />
                    </WrapIndicator>
                </ButtonType>
                <ButtonType onPress={onLoginPhonePressed}>
                    <WrapIndicator>
                        <Type selected={typeLogin === TypeLogin.PHONE}>Phone number</Type>
                        <Indicator selected={typeLogin === TypeLogin.PHONE} />
                    </WrapIndicator>
                </ButtonType>
            </ViewType>
        );
    };

    const renderItemInput = ({value, label, placeholder, isPassword, onChangeText}: IItemInput) => {
        return (
            <ItemInput>
                <Label type="m_14_17">{label}</Label>
                <Input
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    viewRight={isPassword && renderShowPass()}
                    secureTextEntry={isPassword && !showPass}
                />
            </ItemInput>
        );
    };

    const renderInputPhone = () => {
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

    const renderLoginBio = () => {
        return (
            <ViewBio>
                <ButtonBio>
                    <SVGIcon name="ic-finger-bio" size={scales(48)} color={Colors.green2} />
                    <TextBio type="r_10_15">Fingerprint</TextBio>
                </ButtonBio>
                <ButtonBio>
                    <SVGIcon name="ic-face-bio" size={scales(48)} color={Colors.green2} />
                    <TextBio type="r_10_15">Face ID</TextBio>
                </ButtonBio>
            </ViewBio>
        );
    };

    const renderContent = () => {
        return (
            <Content>
                {typeLogin === TypeLogin.EMAIL
                    ? renderItemInput({
                          value: email,
                          label: 'Email Address',
                          placeholder: 'Enter email address',
                          onChangeText: onChangeEmail,
                      })
                    : renderInputPhone()}
                {renderItemInput({
                    value: password,
                    label: 'Password',
                    placeholder: 'Enter password',
                    isPassword: true,
                    onChangeText: onChangePassword,
                })}
                <ButtonForgot>
                    <Forgot type="s_14_17">Forgot Password?</Forgot>
                </ButtonForgot>
                {error && <TextError type="r_10_12">{error}</TextError>}
                <ButtonLogin text={loading ? "" : "Login"} disabled={shouldDisableLogin} onPress={onLoginPressed} loading={loading} />
                {/* {renderLoginBio()} */}
            </Content>
        );
    };

    return (
        <Wrapper onStartShouldSetResponder={onStartShouldSetResponder}>
            {renderAppName()}
            {renderTypeLogin()}
            {renderContent()}
            <TextRegister type="m_14_17">
                {`Don’t have an account? `}
                <SignUp type="m_14_17" suppressHighlighting={true} onPress={onSignUpPressed}>
                    Sign Up
                </SignUp>
            </TextRegister>
        </Wrapper>
    );
};

export default LoginScreen;

const Wrapper = styled.View`
    flex: 1;
    padding-top: ${CommonSize.statusBarHeight}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const ViewAppName = styled.View`
    flex-direction: row;
    align-items: center;
    margin: ${scales(40)}px 0px;
    gap: ${scales(7)}px;
    justify-content: center;
`;

const Image = styled.Image`
    height: ${scales(16)}px;
    width: ${scales(112)}px;
`;

const ViewType = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: ${scales(1)}px;
    border-bottom-color: ${(p) => p.theme.grey2};
`;

const Content = styled.View`
    padding: 24px ${scales(16)}px 80px ${scales(16)}px;
`;

const ButtonType = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

const Type = styled(Text)<{selected?: boolean}>`
    color: ${(p) => (p.selected ? p.theme.green1 : p.theme.grey8)};
    padding: ${scales(16)}px 0px;
`;

const Indicator = styled.View<{selected?: boolean}>`
    height: ${scales(3)}px;
    background-color: ${(p) => (p.selected ? p.theme.green1 : p.theme.transparent)};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;

const WrapIndicator = styled.View``;

const ItemInput = styled.View`
    gap: ${scales(8)}px;
    margin-bottom: ${scales(20)}px;
`;

const Label = styled(Text)``;

const Input = styled(GlobalInput)``;

const ButtonShowPass = styled.TouchableOpacity``;

const ButtonForgot = styled.TouchableOpacity`
    margin-bottom: ${scales(32)}px;
`;

const Forgot = styled(Text)`
    color: ${(p) => p.theme.green2};
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.green2};
`;

const ButtonLogin = styled(GlobalSubmitButton)`
    margin-bottom: ${scales(40)}px;
`;

const ViewBio = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${scales(24)}px;
`;

const ButtonBio = styled.TouchableOpacity`
    align-items: center;
`;

const TextBio = styled(Text)`
    color: ${(p) => p.theme.green2};
    margin-top: ${scales(8)}px;
`;

const TextRegister = styled(Text)`
    text-align: center;
    margin-bottom: ${scales(10)}px;
`;

const SignUp = styled(Text)`
    color: ${(p) => p.theme.green1};
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.green1};
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

const Code = styled(Text)``;

const Flag = styled.Image`
    width: ${scales(20)}px;
    height: ${scales(20)}px;
    border-radius: ${scales(10)}px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

const TextError = styled(Text)`
    margin-bottom: ${scales(10)}px;
    color: ${(p) => p.theme.red1};
`;
