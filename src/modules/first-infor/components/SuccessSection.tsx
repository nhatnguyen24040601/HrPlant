import React from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {useProfile} from 'modules/profile/src/selector';
import {reset} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';

const SuccessSection = () => {
    const profile = useProfile();

    const onSubmitPressed = () => {
        reset('IntroPasscode');
    };

    return (
        <Wrapper>
            <ViewIcon>
                <SVGIcon name="ic-trophy" size={scales(40)} />
            </ViewIcon>
            <ViewCenter>
                <Title type="m_24_29">{`Congratulations ${profile.firstName}!\nyour profile is ready`}</Title>
                <Desc type="r_14_21">{`Your Cadawada account registration was\nsuccessful`}</Desc>
            </ViewCenter>
            <ButtonSubmit text="Finish" onPress={onSubmitPressed} />
        </Wrapper>
    );
};

export default SuccessSection;

const Wrapper = styled.View`
    align-items: center;
    padding: ${scales(100)}px ${scales(20)}px ${CommonSize.bottomSpace}px ${scales(20)}px;
    width: ${CommonSize.scrWidth}px;
    flex: 1;
`;

const ViewCenter = styled.View`
    flex: 1;
    margin-top: ${scales(100)}px;
    gap: ${scales(16)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
    background-color: ${(p) => p.theme.yellow2};
    border-radius: ${scales(40)}px;
    justify-content: center;
    align-items: center;
`;

const Title = styled(Text)`
    text-align: center;
`;

const Desc = styled(Text)`
    color: ${(p) => p.theme.grey1};
    text-align: center;
`;

const ButtonSubmit = styled(GlobalSubmitButton)``;
