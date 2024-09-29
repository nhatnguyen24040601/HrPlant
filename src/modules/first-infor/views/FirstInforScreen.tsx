import React, {useContext, useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import Birthday from '../components/Birthday';
import HomeAddress from '../components/HomeAddress';
import Intro from '../components/Intro';
import SuccessSection from '../components/SuccessSection';
import SurveySection from '../components/SurveySection';
import {FirstInforContext} from '../src/context';

import CommonSize from 'theme/CommonSize';

const FirstInforScreen = () => {
    const {step} = useContext(FirstInforContext);

    const scrollRef = useRef<ScrollView>();

    useEffect(() => {
        scrollRef.current.scrollTo({x: step * CommonSize.scrWidth});
    }, [step]);

    return (
        <Wrapper>
            <Content ref={scrollRef} horizontal scrollEnabled={false}>
                <Intro />
                <SurveySection />
                <Birthday />
                <HomeAddress />
                <SuccessSection />
            </Content>
        </Wrapper>
    );
};

export default FirstInforScreen;

const Wrapper = styled.View`
    flex: 1;
`;

const Content = styled(ScrollView)``;
