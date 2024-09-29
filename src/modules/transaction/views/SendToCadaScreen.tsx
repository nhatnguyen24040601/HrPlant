import React, {useContext, useMemo, useState} from 'react';
import styled from 'styled-components/native';

import ModalVerifyUser from '../components/ModalVerifyUser';

import {checkReceiveCadaWallet} from '../src/api';

import {SendTransactionContext} from '../src/context';

import GlobalHeader from 'components/GlobalHeader';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';

import CommonSize, {scales} from 'theme/CommonSize';

import {validateEmail} from 'utils';
import {TypeOTP} from 'utils/enum';

const SendToCadaScreen = () => {
    const {currency, setReceiver} = useContext(SendTransactionContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [error, setError] = useState('');

    const shouldDisableContinue = useMemo(() => {
        return !firstName || !lastName || !emailOrPhone;
    }, [firstName, lastName, emailOrPhone]);

    const onChangeEmailOrPhone = (text: string) => {
        setError('');
        setEmailOrPhone(text);
    };

    const onContinuePressed = async () => {
        try {
            global.showVerifyUser();
            const isValidEmail = validateEmail(emailOrPhone);
            const res = await checkReceiveCadaWallet({
                currencyId: currency.id,
                object: emailOrPhone,
                type: isValidEmail ? TypeOTP.EMAIL : TypeOTP.PHONE,
            });
            if (res.fistName.toLowerCase() !== firstName.toLowerCase()) {
                setError('First name is incorrect');
            } else if (res.lastName.toLowerCase() !== lastName.toLowerCase()) {
                setError('Last name is incorrect');
            } else {
                setReceiver(res);
                navigate('RecipientInforScreen');
            }
        } catch (err) {
            setError(err);
        }
        global.hideVerifyUser();
    };

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
            <ViewInput>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput value={value} onChangeText={setValue} />
            </ViewInput>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Send to cadawada wallet" />
            <Content>
                <Title type="s_20_26">Enter recipient’s information</Title>
                {renderInput({label: 'First Name', setValue: setFirstName, value: firstName})}
                {renderInput({label: 'Last Name', setValue: setLastName, value: lastName})}
                {renderInput({
                    label: 'Email address or phone number',
                    setValue: onChangeEmailOrPhone,
                    value: emailOrPhone,
                })}
            </Content>
            {error && <TextError type="r_10_12">{error}</TextError>}
            <ButtonContinue text="Continue" onPress={onContinuePressed} disabled={shouldDisableContinue} />
            <ModalVerifyUser />
        </Wrapper>
    );
};

export default SendToCadaScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
    gap: ${scales(20)}px;
`;

const ButtonContinue = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(4)}px;
`;

const Label = styled(Text)``;

const ViewInput = styled.View`
    gap: ${scales(8)}px;
`;

const TextError = styled(Text)`
    margin-bottom: ${scales(10)}px;
    color: ${p => p.theme.red1};
    margin-left: ${scales(16)}px;
`;
