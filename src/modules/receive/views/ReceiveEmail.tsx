import React, {useState} from 'react';
import styled from 'styled-components/native';

import GlobalHeader from 'components/GlobalHeader';

import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';

import CommonSize, {scales} from 'theme/CommonSize';

const ReceiveEmail = () => {
    const [email, setEmail] = useState('');

    const onChangeEmail = (text: string) => {
        setEmail(text);
    };

    return (
        <Wrapper>
            <GlobalHeader text="Send to email address" />
            <Content>
                <Title type="s_20_26">Enter recipient’s email address</Title>
                <Label type="m_14_17">Email address</Label>
                <GlobalInput onChangeText={onChangeEmail} />
            </Content>
            <ViewBottom>
                <ButtonContinue text="Continue" disabled={!email} />
            </ViewBottom>
        </Wrapper>
    );
};

export default ReceiveEmail;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${p => p.theme.white};
`;

const Content = styled.View`
    flex: 1;
    padding: ${scales(16)}px;
`;

const Title = styled(Text)`
    margin-bottom: ${scales(24)}px;
`;

const Label = styled(Text)`
    margin-bottom: ${scales(8)}px;
`;

const ViewBottom = styled.View`
    padding: ${scales(16)}px;
    padding-bottom: ${CommonSize.bottomSpace}px;
    border-top-width: ${scales(1)}px;
    border-top-color: ${p => p.theme.grey13};
`;

const ButtonContinue = styled(GlobalSubmitButton)``;
