import {debounce} from 'lodash';
import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';

import {registerValidate, resendOTP} from '../src/api';
import {RegisterProgress} from '../src/constants';
import {RegisterContext} from '../src/context';

import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';

import CommonSize, {scales} from 'theme/CommonSize';
import {TypeOTP} from 'utils/enum';

const EmailSection = () => {
    const {setEmail: setEmailContext, setProgress} = useContext(RegisterContext);

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendOtp = () => {
        resendOTP({object: email.toLowerCase(), type: TypeOTP.EMAIL})
            .then(() => {
                setEmailContext(email);
                setProgress(RegisterProgress.VerifyEmail);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    };

    const verifyEmail = () => {
        registerValidate({
            Type: TypeOTP.EMAIL,
            Email: email,
        })
            .then(() => {
                sendOtp();
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    };

    const onNextPressed = async () => {
        setLoading(true);
        verifyEmail();
    };

    const onChangeEmail = (text) => {
        setEmail(text);
        setError('');
    };

    const renderInput = () => {
        return (
            <>
                <Label type="m_14_17">Email Address</Label>
                <GlobalInput value={email} placeholder="Enter email address" onChangeText={onChangeEmail} />
            </>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_28_34">Enter email address</Title>
                <Description type="r_14_17">Please provide your email address</Description>
                {renderInput()}
            </Content>
            {error && <TextError type="r_10_12">{error}</TextError>}
            <ButtonNext text="Next" disabled={!email} onPress={onNextPressed} loading={loading} />
        </Wrapper>
    );
};

export default EmailSection;

const Wrapper = styled.View`
    flex: 1;
    width: ${CommonSize.scrWidth}px;
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
`;

const Title = styled(Text)``;

const Description = styled(Text)`
    color: ${p => p.theme.grey1};
    margin-top: ${scales(8)}px;
`;

const Label = styled(Text)`
    margin-top: ${scales(32)}px;
    margin-bottom: ${scales(8)}px;
`;

const Content = styled.View`
    flex: 1;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;

const TextError = styled(Text)`
    margin-bottom: ${scales(10)}px;
    color: ${p => p.theme.red1};
`;
