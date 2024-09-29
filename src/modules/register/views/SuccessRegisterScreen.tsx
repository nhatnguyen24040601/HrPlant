import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {reset} from 'navigation/src/utils';

import CommonSize, {scales} from 'theme/CommonSize';
import { useColors } from 'theme/provider/ThemeProvider';

const SuccessRegisterScreen = () => {

    const Colors = useColors();

    const onSubmitPressed = () => {
        reset('LoginScreen');
    };

    return (
        <Wrapper>
            <StatusBar barStyle="light-content" />
            <Content>
                <ViewIcon>
                    <SVGIcon name="ic-check-register" size={scales(40)} color={Colors.green7} />
                </ViewIcon>
                <Title type="s_24_29">Congratulations! You just opened a Cadawada account</Title>
            </Content>
            <Button text="Get started" onPress={onSubmitPressed} />
        </Wrapper>
    );
};

export default SuccessRegisterScreen;

const Wrapper = styled.View`
    flex: 1;
    padding: ${CommonSize.statusBarHeight}px ${scales(20)}px ${CommonSize.bottomSpace}px ${scales(20)}px;
    align-items: center;
    background-color: ${p => p.theme.green7};
`;

const Image = styled.Image`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
`;

const Title = styled(Text)`
    text-align: center;
    margin-bottom: ${scales(24)}px;
    color: ${p => p.theme.white};
    padding-left: ${scales(20)}px;
    padding-right: ${scales(20)}px;
`;

const Description = styled(Text)`
    color: ${p => p.theme.grey1};
    text-align: center;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
`;

const Button = styled(GlobalSubmitButton)``;

const ViewIcon = styled.View`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    border-radius: ${scales(40)}px;
    background-color: ${p => p.theme.green9};
    margin-top: ${scales(100)}px;
    margin-bottom: ${scales(64)}px;
    justify-content: center;
    align-items: center;
`;
