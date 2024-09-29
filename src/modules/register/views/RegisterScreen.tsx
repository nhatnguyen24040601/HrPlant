import React, {useContext, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import CountrySection from '../components/CountrySection';
import CreatePassSection from '../components/CreatePassSection';
import EmailSection from '../components/EmailSection';
import NameSection from '../components/NameSection';
import PhoneSection from '../components/PhoneSection';
import ProgessSection from '../components/ProgessSection';

import TypeAccountSection from '../components/TypeAccountSection';
import VerifyEmailSection from '../components/VerifyEmailSection';
import VerifyPhoneSection from '../components/VerifyPhoneSection';
import {RegisterContext} from '../src/context';

import GlobalHeader from 'components/GlobalHeader';

import {goBack} from 'navigation/src/utils';

import CommonSize from 'theme/CommonSize';

const RegisterScreen = () => {
    const {resetContext, progress} = useContext(RegisterContext);
    const scrollRef = useRef<ScrollView>();

    useEffect(() => {
        return () => {
            resetContext();
        };
    }, []);

    useEffect(() => {
        scrollRef.current.scrollTo({x: CommonSize.scrWidth * progress.position});
    }, [progress]);

    const onBackPressed = () => {
        goBack();
    };

    return (
        <Wrapper>
            <GlobalHeader onBackPressed={onBackPressed} text={progress.label} />
            <ProgessSection />
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled={true}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}>
                <CountrySection />
                <TypeAccountSection />
                <NameSection />
                <EmailSection />
                <VerifyEmailSection />
                <PhoneSection />
                <VerifyPhoneSection />
                <CreatePassSection />
            </ScrollView>
        </Wrapper>
    );
};

export default RegisterScreen;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${p => p.theme.white};
    padding-bottom: ${CommonSize.bottomSpace}px;
`;
