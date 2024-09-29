import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';

import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import InputCode from 'components/InputCode';
import Text from 'components/Text';
import {useProfile} from 'modules/profile/src/selector';
import {useCountdown} from 'modules/register/hook/useCountdown';
import {reset as resetNavigation} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';


const VerifyOTPTransaction = () => {
    const [code, setCode] = useState('');
    const length = 6;
    const time = 60000;
    const profile = useProfile();

    const {ms, setCountdownTime, reset, clear} = useCountdown();

    useEffect(() => {
        setCountdownTime(time);
    }, []);

    const convertTime = useMemo(() => {
        const second = ms / 1000;
        const minutes = Math.floor(second / 60);
        const secondLeft = second - minutes * 60;
        return ` ${minutes < 10 ? `0${minutes}` : minutes}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}s`;
    }, [ms]);

    const onResendPressed = () => {
        reset(time);
    };

    const onNextPressed = () => {
        resetNavigation('PaymentResultScreen');
    };

    return (
        <Wrapper>
            <GlobalHeader text="" />
            <Content>
                <Title type="s_28_34">Authorize this payment</Title>
                <Description type="r_14_17">
                    To authorize this payment, enter the OTP sent to your phone number{' '}
                    <Text type="s_14_17">+{profile.phone}</Text>
                </Description>
                <SInputCode code={code} setCode={setCode} length={length} />
                <ViewCountDown>
                    <TextNotReceive type="m_14_17">Didn’t receive any code?</TextNotReceive>
                    <TextResend
                        suppressHighlighting={true}
                        disabled={ms !== 0}
                        onPress={onResendPressed}
                        isEnd={ms === 0}
                        type="s_14_17">
                        {ms === 0 ? 'Resend' : `Resend in ${convertTime}`}
                    </TextResend>
                </ViewCountDown>
            </Content>
            <ButtonNext text="Authorize" disabled={code.length < length} onPress={onNextPressed} />
        </Wrapper>
    );
};

export default VerifyOTPTransaction;

const Wrapper = styled.View`
    flex: 1;
    width: ${CommonSize.scrWidth}px;
    padding: ${scales(24)}px ${scales(16)}px ${CommonSize.bottomSpace}px ${scales(16)}px;
`;

const Content = styled.View`
    flex: 1;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;

const Title = styled(Text)``;

const Description = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-top: ${scales(8)}px;
`;

const ChangeEmail = styled(Text)`
    color: ${(p) => p.theme.green1};
    text-decoration: underline;
    text-decoration-color: ${(p) => p.theme.green1};
`;

const SInputCode = styled(InputCode)`
    margin: ${scales(24)}px 0px;
`;

const ViewCountDown = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TextNotReceive = styled(Text)``;

const TextResend = styled(Text)<{isEnd: boolean}>`
    color: ${(p) => (p.isEnd ? p.theme.green1 : p.theme.black1)};
    margin-left: ${scales(4)}px;
`;
