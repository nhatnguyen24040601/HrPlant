import React, {useContext} from 'react';
import styled from 'styled-components/native';

import {RegisterProgress} from '../src/constants';
import {RegisterContext} from '../src/context';

import SVGIcon from 'assets/svg';
import GlobalInput from 'components/GlobalInput';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';
import {TypeRegister} from 'utils/enum';

const NameSection = () => {
    const Colors = useColors();
    const {firstName, setFirstName, lastName, setLastName, setProgress, typeRegister} = useContext(RegisterContext);

    const onNextPressed = () => {
        setProgress(RegisterProgress.InputEmail);
    };

    const renderWarning = () => {
        return (
            <ViewWarning>
                <SVGIcon name="ic-warning" size={scales(24)} color={Colors.blue3} />
                <TextWarning type="r_12_18">
                    Business representative is either the owner of the business or one of the owners of the business
                </TextWarning>
            </ViewWarning>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_28_34">What is your name?</Title>
                <Description type="r_14_17">
                Please provide the name of business representative
                </Description>
                <Label type="m_14_17">First Name</Label>
                <GlobalInput value={firstName} placeholder="Enter first name" onChangeText={setFirstName} />
                <Label type="m_14_17">Last Name</Label>
                <GlobalInput value={lastName} placeholder="Enter last name" onChangeText={setLastName} />
            </Content>
            {typeRegister === TypeRegister.Enterprise && renderWarning()}
            <ButtonNext text="Next" disabled={!firstName || !lastName} onPress={onNextPressed} />
        </Wrapper>
    );
};

export default NameSection;

const Wrapper = styled.View`
    flex: 1;
    width: ${CommonSize.scrWidth}px;
    padding: ${scales(24)}px ${scales(16)}px 0px ${scales(16)}px;
`;

const Content = styled.View`
    flex: 1;
`;

const Title = styled(Text)``;

const Description = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin-top: ${scales(8)}px;
`;

const Label = styled(Text)`
    margin-top: ${scales(32)}px;
    margin-bottom: ${scales(8)}px;
`;

const ButtonNext = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
`;

const ViewWarning = styled.View`
    flex-direction: row;
    align-items: flex-start;
    padding: ${scales(12)}px;
    gap: ${scales(8)}px;
    margin-bottom: ${scales(24)}px;
    background-color: ${(p) => p.theme.blue2};
    border-radius: ${scales(8)}px;
`;

const TextWarning = styled(Text)`
    color: ${(p) => p.theme.blue1};
    flex: 1;
`;
