import React from 'react';
import {css} from 'styled-components';
import styled, {toStyleSheet} from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {useProfile} from 'modules/profile/src/selector';
import {reset} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const SetupPasscodeSuccess = () => {
    const Colors = useColors();
    const profile = useProfile();

    const onSubmitPressed = () => {
        reset('Main');
    };

    return (
        <Wrapper>
            <ViewIcon>
                <SVGIcon name="ic-rocket" size={scales(40)} color={Colors.white} />
            </ViewIcon>
            <ViewCenter>
                <Title type="m_24_29">Welcome to CadaWada {profile.firstName}!</Title>
                <Desc type="r_14_21">{`Your login pin was successfully created.`}</Desc>
            </ViewCenter>
            <ButtonSubmit text="Get started" onPress={onSubmitPressed} />
        </Wrapper>
    );
};

export default SetupPasscodeSuccess;

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
    color: ${(p) => p.theme.grey1};
    text-align: center;
`;

const ButtonSubmit = styled(GlobalSubmitButton)``;

const SkipButton = styled(GlobalSubmitButton)`
    margin-top: ${scales(12)}px;
    background-color: ${(p) => p.theme.grey3};
`;

const ViewIcon = styled.View`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    background-color: ${(p) => p.theme.green1};
    border-radius: ${scales(40)}px;
    justify-content: center;
    align-items: center;
`;
