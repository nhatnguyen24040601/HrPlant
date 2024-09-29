import React, {useState} from 'react';
import styled from 'styled-components/native';

import TransPasscodeSection from '../components/TransPasscodeSection';

import GlobalHeader from 'components/GlobalHeader';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate, reset} from 'navigation/src/utils';

import CommonSize, {scales} from 'theme/CommonSize';

const TransactionPasscode = () => {
    const [passcode, setPasscode] = useState('');

    const onRequestOTP = () => {
        navigate('VerifyOTPTransaction');
    };

    const renderUseOTP = () => {
        return (
            <TextForgot type="m_14_17">
                Did you forgot your pin?{' '}
                <TextRequestOTP type="s_14_17" onPress={onRequestOTP} suppressHighlighting={true}>
                    Request OTP instead
                </TextRequestOTP>
            </TextForgot>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Authorize transaction" />
            <Content>
                <Label type="m_14_21">Enter your transaction PIN</Label>
                <TransPasscodeSection value={passcode} setValue={setPasscode} />
                {renderUseOTP()}
            </Content>
            <ViewBottom>
                <ButtonContinue
                    text="Authorize"
                    disabled={passcode.length < 4}
                    onPress={() => reset('PaymentResultScreen')}
                />
            </ViewBottom>
        </Wrapper>
    );
};

export default TransactionPasscode;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: 0px ${scales(16)}px;
    justify-content: center;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${(p) => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${(p) => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;

const TextForgot = styled(Text)`
    text-align: center;
    margin-top: ${scales(50)}px;
`;

const TextRequestOTP = styled(Text)`
    color: ${(p) => p.theme.green1};
`;

const Label = styled(Text)`
    color: ${(p) => p.theme.grey1};
    text-align: center;
    margin-bottom: ${scales(24)}px;
`;
