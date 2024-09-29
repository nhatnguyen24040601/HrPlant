import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import Images from 'assets/images';
import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate, reset} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const WelcomScreen = () => {
    const Colors = useColors();
    const onRegisterPressed = () => {
        navigate('RegisterScreen');
    };

    const onLoginPressed = () => {
        reset('LoginScreen');
    };

    return (
        <Wrapper>
            <ViewAppName>
                <SVGIcon name="ic-app" size={scales(34)} color={Colors.white} />
                <Image source={Images.AppName} />
            </ViewAppName>
            <ViewBottom>
                <Welcome type="s_24_28">Welcome to CadaWada</Welcome>
                <ViewButton>
                    <ButtonLogin text="Login" onPress={onLoginPressed} />
                    <ButtonRegister
                        textStyle={{color: Colors.black1}}
                        text="Create account"
                        onPress={onRegisterPressed}
                    />
                </ViewButton>
            </ViewBottom>
        </Wrapper>
    );
};

export default WelcomScreen;

const Wrapper = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: ${CommonSize.statusBarHeight}px 16px ${CommonSize.bottomSpace}px 16px;
    background-color: tomato;
    align-items: center;
`;

const Image = styled.Image`
    height: ${scales(23)}px;
    width: ${scales((23 * 112) / 16)}px;
`;

const ViewBottom = styled.View`
    width: 100%;
`;

const ViewButton = styled.View`
    gap: ${scales(12)}px;
    width: 100%;
`;

const Welcome = styled(Text)`
    color: ${(p) => p.theme.white};
    margin-bottom: ${scales(32)}px;
    text-align: center;
`;

const ButtonRegister = styled(GlobalSubmitButton)`
    background-color: ${(p) => p.theme.white};
    justify-content: center;
    align-items: center;
    border-radius: ${scales(8)}px;
`;

const ButtonLogin = styled(GlobalSubmitButton)`
    width: 100%;
`;

const ViewAppName = styled.View`
    flex-direction: row;
    align-items: center;
    top: ${scales(70)}px;
    gap: ${scales(7)}px;
`;
