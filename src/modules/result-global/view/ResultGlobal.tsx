import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import Text from 'components/Text';
import {goBack, reset, useNavigationParams} from 'navigation/src/utils';

import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

import {TNameOfIconSVG} from 'assets/svg';

export interface IResultGlobal {
    title: string;
    type: 'warning' | 'success' | 'sending';
    icon?: TNameOfIconSVG;
    desc?: string;
    value?: string;
    firstButton?: {
        text?: string;
        onPress?: () => void;
        containerStyle?: object;
        textStyle?: object;
        cusRender?: () => React.ReactNode;
    };
    secondButton?: {
        text?: string;
        onPress?: () => void;
        containerStyle?: object;
        textStyle?: object;
        cusRender?: () => React.ReactNode;
    };
}

const ResultGlobalScreen = () => {
    const Colors = useColors();
    const {type, name, value, desc} = useNavigationParams('ResultGlobalScreen');

    const detail = useMemo(() => {
        switch (type) {
            case 'sending':
                return {
                    title: 'Your payment is on its way...',
                    value: `${value} NGN`,
                    desc: `${name} will receive`,
                    firstButton: 'Share transaction details',
                    secondButton: 'Generate receipt',
                    icon: 'ic-paper-plane' as TNameOfIconSVG,
                    iconColor: Colors.yellow2,
                    iconSize: scales(97),
                };
            case 'success':
                return {
                    title: 'Successful',
                    desc: desc,
                    icon: 'ic-check' as TNameOfIconSVG,
                    iconColor: Colors.green10,
                    iconSize: scales(60),
                };
            case 'warning':
                return {
                    title: 'Warning',
                    icon: 'ic-warning' as TNameOfIconSVG,
                    iconColor: Colors.green10,
                    iconSize: scales(60),
                };
            default:
                return {
                    title: 'Unknown Status',
                    desc: desc,
                    icon: 'ic-warning' as TNameOfIconSVG,
                    iconColor: Colors.green10,
                    iconSize: scales(60),
                };
        }
    }, [type, value, name, Colors]);

    const onGoback = () => {
        goBack();
    };

    const onSubmitPressed = () => {};

    const onSubmitSecondButtonPressed = () => {};
    return (
        <Wrapper>
            <StatusBar barStyle="light-content" />
            <ViewIconX onPress={onGoback}>
                <SVGIcon name={'ic-x'} size={scales(24)} color={Colors.white} />
            </ViewIconX>
            <Content>
                {detail.icon ? (
                    <ViewIcon>
                        <SVGIcon name={detail.icon} size={detail.iconSize} color={detail.iconColor} />
                    </ViewIcon>
                ) : (
                    <ViewIcon>
                        <SVGIcon name="ic-warning" size={detail.iconSize} color={detail.iconColor} />
                    </ViewIcon>
                )}
                <Title type="b_20_26">{detail.title}</Title>
                <Description type="r_14_21">{detail.desc}</Description>
                <ValueText type="b_27_33">{detail.value}</ValueText>
            </Content>
            <WrapButton>
                {detail.firstButton && <Button text={detail.firstButton} onPress={onSubmitPressed} />}
                {detail.secondButton && (
                    <SecondButton text={detail.secondButton} onPress={onSubmitSecondButtonPressed} />
                )}
            </WrapButton>
        </Wrapper>
    );
};

export default ResultGlobalScreen;

const Wrapper = styled.View`
    flex: 1;
    padding: ${CommonSize.statusBarHeight}px ${scales(20)}px ${CommonSize.bottomSpace}px ${scales(20)}px;
    align-items: center;
    background-color: ${(p) => p.theme.green7};
`;

const Image = styled.Image`
    width: ${scales(80)}px;
    height: ${scales(80)}px;
`;

const Title = styled(Text)`
    text-align: center;
    margin-bottom: ${scales(16)}px;
    color: ${(p) => p.theme.white};
    padding-left: ${scales(20)}px;
    padding-right: ${scales(20)}px;
`;

const Description = styled(Text)`
    margin-bottom: ${scales(8)}px;
    color: ${(p) => p.theme.white};
    text-align: center;
`;

const ValueText = styled(Text)`
    color: ${(p) => p.theme.green1};
    text-align: center;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
`;

const WrapButton = styled.View`
    width: 100%;
    gap: ${scales(8)}px;
    align-items: center;
`;

const Button = styled(GlobalSubmitButton)``;

const SecondButton = styled(GlobalSubmitButton)`
    background-color: ${(p) => p.theme.green7};
`;

const ViewIconX = styled.TouchableOpacity`
    width: 100%;
    align-items: flex-start;
    margin-top: ${scales(16)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(100)}px;
    height: ${scales(100)}px;
    border-radius: ${scales(50)}px;
    background-color: ${(p) => p.theme.yellow2};
    margin-top: ${scales(100)}px;
    margin-bottom: ${scales(64)}px;
    justify-content: center;
    align-items: center;
`;
