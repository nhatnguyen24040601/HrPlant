import React from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {useProfile} from 'modules/profile/src/selector';
import {reset} from 'navigation/src/utils';

import CommonSize, {scales} from 'theme/CommonSize';

const PaymentResultScreen = () => {
    const profile = useProfile();

    const onSubmitPressed = () => {
        reset('Main');
    };

    return (
        <Wrapper>
            <SVGIcon name="ic-check-circle" size={scales(124)} />
            <ViewCenter>
                <Title type="m_24_29">Payment successful</Title>
                <Desc type="r_14_21">
                    Hey {profile.firstName}, we will guide you on creating your first wallet on cadawada
                </Desc>
            </ViewCenter>
            <ButtonSubmit text="Continue" onPress={onSubmitPressed} />
        </Wrapper>
    );
};

export default PaymentResultScreen;

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
