import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';

import Text from 'components/Text';


import GlobalInput from 'components/GlobalInput';
import GlobalHeader from 'components/GlobalHeader';
import CommonSize, {scales} from 'theme/CommonSize';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import SendEmailOrPhoneSuccess, {IHandleSendEmailPhone} from '../components/SendEmailOrPhoneSuccess';

interface IItemInput {
    label: string;
    value: string;
    setValue: (value: string) => void;
}

const SendToTelephone = () => {
    const [email, setEmail] = useState('');
    const sendEmailOrPhoneRef = useRef<IHandleSendEmailPhone>();

    const onSendPressed = () => {
        sendEmailOrPhoneRef.current.showModal({value: email, type: 'email'});
    };

    const renderInput = ({label, value, setValue}: IItemInput) => {
        return (
            <ViewItem>
                <Label type="m_14_17">{label}</Label>
                <GlobalInput value={value} onChangeText={setValue} />
            </ViewItem>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Send to cadawada wallet" />
            <Content>
                <Title type="s_20_26">Enter recipient’s email address</Title>
                {renderInput({label: 'Email address', value: email, setValue: setEmail})}
            </Content>
            <ViewBottom>
                <ButtonContinue text="Send" disabled={!email.trim()} onPress={onSendPressed} />
            </ViewBottom>
            <SendEmailOrPhoneSuccess ref={sendEmailOrPhoneRef} />
        </Wrapper>
    );
};

export default SendToTelephone;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(24)}px;
`;

const Label = styled(Text)``;

const ViewItem = styled.View`
    gap: ${scales(8)}px;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    background-color: ${(p) => p.theme.white};
    border-top-width: ${scales(1)}px;
    border-top-color: ${(p) => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;
