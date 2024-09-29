import React from 'react';
import Swiper from 'react-native-swiper';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import Images from 'assets/images';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {hideIntro} from 'modules/login/src/actions';
import {navigate} from 'navigation/src/utils';
import CommonSize, {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';

const IntroScreen = () => {
    const dispatch = useDispatch();

    const onContinuePressed = () => {
        dispatch(hideIntro());
        navigate('WelcomeScreen');
    };

    const renderDescription = ({title, description}) => {
        return (
            <ViewDescription>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </ViewDescription>
        );
    };

    return (
        <Wrapper>
            <Image source={Images.ImageWallet} />
            <Swiper loop={false} dot={<Dot />} activeDot={<ActiveDot />}>
                {renderDescription({
                    title: 'Create your first wallet',
                    description: 'Hey Christian, we will guide you on creating\nyour first wallet on cadawada',
                })}
                {renderDescription({
                    title: 'Send money anywhere\nyou are in the wrold',
                    description: 'Hey Christian, we will guide you on creating your first wallet on cadawada',
                })}
                {renderDescription({
                    title: 'Send money anywhere\nyou are in the wrold',
                    description: 'Hey Christian, we will guide you on creating your first wallet on cadawada',
                })}
            </Swiper>
            <GlobalSubmitButton text="Continue" onPress={onContinuePressed} />
        </Wrapper>
    );
};

export default IntroScreen;

const Wrapper = styled.View`
    flex: 1;
    padding: ${CommonSize.statusBarHeight + scales(30)}px 24px ${CommonSize.bottomSpace}px 24px;
    align-items: center;
`;

const Image = styled.Image`
    width: ${CommonSize.scrWidth - scales(100)}px;
    height: ${(185 / 220) * (CommonSize.scrWidth - scales(100))}px;
`;

const ViewDescription = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
    gap: ${scales(16)}px;
`;

const Title = styled.Text`
    font-size: ${scales(24)}px;
    line-height: ${scales(28)}px;
    color: ${(p) => p.theme.black1};
    ${Fonts.semiBold};
    text-align: center;
`;

const Description = styled.Text`
    font-size: ${scales(14)}px;
    line-height: ${scales(21)}px;
    color: ${(p) => p.theme.black1};
    ${Fonts.regular};
    text-align: center;
    padding: 0px 24px;
`;

const Dot = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${(p) => p.theme.grey2};
    margin: 0px 6px;
`;

const ActiveDot = styled.View`
    width: 36px;
    height: 8px;
    border-radius: 20px;
    background-color: ${(p) => p.theme.green2};
    margin: 0px 6px;
`;
