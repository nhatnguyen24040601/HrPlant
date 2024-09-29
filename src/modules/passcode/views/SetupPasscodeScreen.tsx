import React, {useEffect, useMemo, useState} from 'react';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import styled from 'styled-components/native';

import PasscodeDotSection from '../components/PasscodeDotSection';
import PasscodeKeyboard from '../components/PasscodeKeyboard';

import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';

const SetupPasscodeScreen = () => {
    const [passcode, setPassCode] = useState('');
    const [confirmPassCode, setConfirmPassCode] = useState('');
    const [showError, setShowError] = useState(false);

    const translateY = useSharedValue(0);

    const shouldShowConfirm = useMemo(() => {
        return passcode.length === 4;
    }, [passcode]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}],
        };
    });

    useEffect(() => {
        if (confirmPassCode.length === 4) {
            if (confirmPassCode !== passcode) {
                setShowError(true);
                translateY.value = withTiming(5, {easing: Easing.bounce});
            } else {
                navigate('SetupPasscodeSuccess');
            }
        }
    }, [confirmPassCode]);

    const onKeyPressed = () => {
        setShowError(false);
        translateY.value = 0;
    };

    const renderViewPassCode = () => {
        return (
            <ViewPassCode>
                <TextTitle>{shouldShowConfirm ? 'Confirm pin' : ''}</TextTitle>
                <PasscodeDotSection value={shouldShowConfirm ? confirmPassCode : passcode} type="dot" />
                <Animated.View style={animatedStyle}>
                    <TextError type="r_10_12">{showError ? 'Confirm pin miss match' : ''}</TextError>
                </Animated.View>
            </ViewPassCode>
        );
    };

    return (
        <Wrapper>
            <Title type="s_28_33">Secure your account</Title>
            <Desc type="r_14_21">Enter your 6 digits pin to protect your account from unauthorized access</Desc>
            {renderViewPassCode()}
            <PasscodeKeyboard
                value={shouldShowConfirm ? confirmPassCode : passcode}
                setValue={shouldShowConfirm ? setConfirmPassCode : setPassCode}
                onKeyPress={onKeyPressed}
            />
            <TextSkip type="s_14_17">Do this later</TextSkip>
        </Wrapper>
    );
};

export default SetupPasscodeScreen;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
    padding: ${CommonSize.statusBarHeight + scales(40)}px ${scales(16)}px ${CommonSize.bottomSpace}px ${scales(16)}px;
`;

const Title = styled(Text)``;

const Desc = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-top: ${scales(8)}px;
`;

const TextSkip = styled(Text)`
    color: ${(p) => p.theme.green1};
    text-align: center;
    margin-bottom: ${scales(20)}px;
    margin-top: ${scales(40)}px;
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
