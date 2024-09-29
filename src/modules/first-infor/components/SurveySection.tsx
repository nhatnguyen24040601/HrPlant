import React, {useContext, useMemo, useState} from 'react';
import styled from 'styled-components/native';

import { FirstInforStep } from '../src/constant';
import {FirstInforContext} from '../src/context';

import GlobalSubmitButton from 'components/GlobalSubmitButton';
import RadioButton from 'components/RadioButton';
import Text from 'components/Text';

import CommonSize, {scales} from 'theme/CommonSize';

const SurveySection = () => {
    const {setStep} = useContext(FirstInforContext);
    const [selectedOption, setSelectedOption] = useState<number>(-1);

    const data = useMemo<firstInfor.IItemSurvey[]>(
        () => [
            {
                label: 'Receive payments',
            },
            {
                label: 'Receive payments',
            },
            {
                label: 'Receive payments',
            },
            {
                label: 'Receive payments',
            },
            {
                label: 'Receive payments',
            },
        ],
        []
    );

    const onNextPressed = () => {
        setStep(FirstInforStep.Birthday);
    };

    const renderItem = (item: firstInfor.IItemSurvey, index: number) => {
        const isSelected = selectedOption === index;

        const onItemPressed = () => {
            setSelectedOption(index);
        };

        return (
            <WrapItem isSelected={isSelected} key={index} onPress={onItemPressed}>
                <ItemLabel type="s_14_21">{item.label}</ItemLabel>
                <RadioButton isChecked={isSelected} />
            </WrapItem>
        );
    };

    return (
        <Wrapper>
            <Content>
                <Title type="s_24_29">What would you like to do Cadawada?</Title>
                {data.map(renderItem)}
            </Content>
            <Button text="Next" onPress={onNextPressed} disabled={selectedOption === -1} />
        </Wrapper>
    );
};

export default SurveySection;

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
    width: 100%;
    gap: ${scales(12)}px;
`;

const Title = styled(Text)`
    text-align: center;
    margin-top: ${scales(100)}px;
    margin-bottom: ${scales(20)}px;
`;

const Button = styled(GlobalSubmitButton)``;

const WrapItem = styled.TouchableOpacity<{isSelected: boolean}>`
    background-color: ${(p) => (p.isSelected ? p.theme.green8 : p.theme.grey3)};
    padding: ${scales(20)}px ${scales(16)}px;
    width: 100%;
    border-radius: ${scales(8)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-width: ${scales(2)}px;
    border-color: ${(p) => (p.isSelected ? p.theme.green1 : p.theme.transparent)};
`;

const ItemLabel = styled(Text)`
    color: ${p => p.theme.green7};
`;
