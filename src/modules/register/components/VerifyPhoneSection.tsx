import React, {useContext, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';

import {useCountdown} from '../hook/useCountdown';
import {resendOTP, verifyOTP} from '../src/api';
import {RegisterProgress} from '../src/constants';
import {RegisterContext} from '../src/context';

import GlobalSubmitButton from 'components/GlobalSubmitButton';
import InputCode from 'components/InputCode';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {TypeOTP} from 'utils/enum';

const VerifyPhoneSection = () => {
    const {phone, setProgress, progress} = useContext(RegisterContext);
    const [code, setCode] = useState('');
    const length = 6;
    const time = 60000;

    const {ms, setCountdownTime, reset, clear} = useCountdown();

    useEffect(() => {
        if (progress.position === RegisterProgress.VerifyPhone.position) {
            setCountdownTime(time);
        }
    }, [progress]);

    const convertTime = useMemo(() => {
        const second = ms / 1000;
        const minutes = Math.floor(second / 60);
        const secondLeft = second - minutes * 60;
        return ` ${minutes < 10 ? `0${minutes}` : minutes}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}s`;
    }, [ms]);

    const onResendPressed = () => {
        resendOTP({object: phone.toLowerCase(), type: TypeOTP.PHONE})
            .then(() => {
                reset(time);
            })
            .catch(() => {});
    };

    const onChangePhoneNumberPressed = () => {
        setProgress(RegisterProgress.InputPhone);
    };

    const onNextPressed = () => {
        verifyOTP({
            object: `+${phone}`,
            otp: code,
            type: TypeOTP.PHONE,
        }).then(() => {
            clear();
            setProgress(RegisterProgress.CreatePass);
        });
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_28_34">Verify your phone number</Title>
                <Description type="r_14_17">
                    Enter the 6-digits OTP sent to your phone number
                    <Text type="s_14_17">{`\n+${phone} `}</Text>
                    <ChangePhoneNumber suppressHighlighting={true} onPress={onChangePhoneNumberPressed} type="s_14_17">
                        is this phone number correct?
                    </ChangePhoneNumber>
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
            <ButtonNext text="Next" disabled={code.length < length} onPress={onNextPressed} />
        </Wrapper>
    );
};

export default VerifyPhoneSection;

const Wrapper = styled.View`
    flex: 1;
    width: ${CommonSize.scrWidth}px;
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
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

const ChangePhoneNumber = styled(Text)`
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
