import React from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {reset} from 'navigation/src/utils';
import { getColors } from 'theme/CommonColors';
import CommonSize, {scales} from 'theme/CommonSize';

const IntroPasscode = () => {
    const onSubmitPressed = () => {
        reset('SetupPasscodeScreen')
    };

    const onSkipPressed = () => {
        reset('Main')
    }

    return (
        <Wrapper>
            <ViewIcon>
                <SVGIcon name="ic-key" size={scales(40)} />
            </ViewIcon>
            <ViewCenter>
                <Title type="m_24_29">Set up login pin</Title>
                <Desc type="r_14_21">{`Protect your account from unauthorized\naccess, set up your login pin`}</Desc>
            </ViewCenter>
            <ButtonSubmit text="Continue" onPress={onSubmitPressed} />
            <SkipButton textStyle={toStyleSheet(TextSkip)} text="Skip for later" onPress={onSkipPressed} />
        </Wrapper>
    );
};

export default IntroPasscode;

const TextSkip = css`
    color: ${getColors().green2};
`;

const Wrapper = styled.View`
    flex: 1;
    padding: ${scales(CommonSize.statusBarHeight + scales(100))}px ${scales(16)}px ${CommonSize.bottomSpace}px
        ${scales(16)}px;
    align-items: center;
`;

const ViewCenter = styled.View`
    flex: 1;
    margin-top: ${scales(100)}px;
    gap: ${scales(16)}px;
`;

const Title = styled(Text)`
    text-align: center;
`;

const Desc = styled(Text)`
    color: ${p => p.theme.grey1};
    text-align: center;
`;

const ButtonSubmit = styled(GlobalSubmitButton)``;

const SkipButton = styled(GlobalSubmitButton)`
    margin-top: ${scales(12)}px;
    background-color: ${p => p.theme.grey3};
`;

const ViewIcon = styled.View`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    background-color: ${p => p.theme.green3};
    border-radius: ${scales(40)}px;
    justify-content: center;
    align-items: center;
`;
