import React, {useContext} from 'react';
import styled from 'styled-components/native';

import {FirstInforStep} from '../src/constant';
import {FirstInforContext} from '../src/context';

import Images from 'assets/images';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';

const Intro = () => {
    const {setStep} = useContext(FirstInforContext);

    const onCompletePressed = () => {
        setStep(FirstInforStep.Survey);
    };

    return (
        <Wrapper>
            <Content>
                <Icon source={Images.ImageSuccessRegister} />
                <Title type="s_24_29">You are almost there! Finish setting up your account.</Title>
                <Desc type="r_14_21">
                    To help you get the most out of our app we need a bit more information from you.
                </Desc>
            </Content>
            <Button text="Complete profile" onPress={onCompletePressed} />
        </Wrapper>
    );
};

export default Intro;

const Wrapper = styled.View`
    align-items: center;
    padding: 0px ${scales(20)}px;
    width: ${CommonSize.scrWidth}px;
    flex: 1;
    padding-bottom: ${CommonSize.bottomSpace}px;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
`;

const Icon = styled.Image`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    margin: ${scales(90)}px 0px;
`;

const Title = styled(Text)`
    text-align: center;
`;

const Desc = styled(Text)`
    text-align: center;
    margin-top: ${scales(16)}px;
`;

const Button = styled(GlobalSubmitButton)``;
