import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import styled from 'styled-components/native';

import PasscodeDotSection from '../components/PasscodeDotSection';
import PasscodeKeyboard from '../components/PasscodeKeyboard';

import Images from 'assets/images';
import SVGIcon from 'assets/svg';

import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const PasscodeLogin = () => {
    const Colors = useColors();
    const [shouldShow, setShouldShow] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const backHandler = useRef<NativeEventSubscription>();

    const translateY = useSharedValue(0);

    useEffect(() => {
        global.showPasscode = showModal;
    }, []);

    const showModal = () => {
        setShouldShow(true);
        backHandler.current = BackHandler.addEventListener('hardwareBackPress', () => true);
    };

    const hideModal = () => {
        setShouldShow(false);
        setPasscode('');
        backHandler.current.remove();
    };

    useEffect(() => {
        if (passcode.length === 4) {
            if (passcode !== '1111') {
                setError('Wrong passcode!');
                translateY.value = withTiming(5, {easing: Easing.bounce});
            } else {
                hideModal();
            }
        }
    }, [passcode]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}],
        };
    });

    const onKeyPressed = () => {
        setError('');
        translateY.value = 0;
    };

    const renderViewPassCode = () => {
        return (
            <ViewPassCode>
                <TextTitle>Enter your login pin</TextTitle>
                <PasscodeDotSection value={passcode} type="dot" />
                <Animated.View style={animatedStyle}>
                    <TextError type="r_10_12">{error}</TextError>
                </Animated.View>
            </ViewPassCode>
        );
    };

    if (shouldShow) {
        return (
            <Wrapper>
                <ViewAppName>
                    <SVGIcon name="ic-app" size={scales(31)} color={Colors.green1} />
                    <Image source={Images.AppName} tintColor={Colors.black} />
                </ViewAppName>
                {renderViewPassCode()}
                <PasscodeKeyboard
                    value={passcode}
                    setValue={setPasscode}
                    onKeyPress={onKeyPressed}
                    containerStyle={{width: '100%'}}
                />
                <ForgotPass type="s_14_17">Forgot password?</ForgotPass>
            </Wrapper>
        );
    }
    return null;
};

export default PasscodeLogin;

const Wrapper = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(p) => p.theme.white};
    align-items: center;
    padding: 0px ${scales(16)}px ${CommonSize.bottomSpace + scales(40)}px ${scales(16)}px;
`;

const ViewAppName = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: ${CommonSize.statusBarHeight + scales(50)}px;
    gap: ${scales(7)}px;
`;

const Image = styled.Image`
    height: ${scales(20)}px;
    width: ${scales((20 * 112) / 16)}px;
`;

const ViewPassCode = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TextTitle = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-bottom: ${scales(24)}px;
`;

const TextError = styled(Text)`
    margin-top: ${scales(24)}px;
    color: ${(p) => p.theme.red1};
`;

const ForgotPass = styled(Text)`
    margin-top: ${scales(50)}px;
    color: ${(p) => p.theme.green2};
    text-decoration: underline;
`;
