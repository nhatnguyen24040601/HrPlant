import React from 'react';
import styled from 'styled-components/native';

import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';

import Text from 'components/Text';
import {navigate} from 'navigation/src/utils';

import {scales} from 'theme/CommonSize';

const ReceiveTypeScreen = () => {
    const onQRPressed = () => {
        navigate('CreateReceiveQR');
    };

    const onMailPressed = () => {
        navigate('ReceiveEmail');
    };

    const renderButtonType = ({
        icon,
        label,
        desc,
        onPress,
    }: {
        icon: TNameOfIconSVG;
        label: string;
        desc: string;
        onPress: () => void;
    }) => {
        return (
            <ButtonType onPress={onPress}>
                <ViewIcon>
                    <SVGIcon name={icon} size={scales(24)} />
                </ViewIcon>
                <ViewDesc>
                    <Label type="s_14_21">{label}</Label>
                    <Desc type="r_12_18">{desc}</Desc>
                </ViewDesc>
            </ButtonType>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Receive money" />
            <Content>
                <Title type="s_20_26">How would you like to receive money?</Title>
                {renderButtonType({
                    icon: 'ic-receive-qr',
                    label: 'Show QR code',
                    desc: 'Let others scan your QR code to pay you',
                    onPress: onQRPressed,
                })}
                {renderButtonType({
                    icon: 'ic-receive-mail',
                    label: 'Send request to recipient’s email',
                    desc: 'Enter recipient’s email address',
                    onPress: onMailPressed,
                })}
            </Content>
        </Wrapper>
    );
};

export default ReceiveTypeScreen;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${p => p.theme.white};
`;

const Title = styled(Text)`
    margin-bottom: ${scales(24)}px;
`;

const Content = styled.View`
    padding: ${scales(16)}px;
`;

const ButtonType = styled.TouchableOpacity`
    background-color: tomato;
    margin-bottom: ${scales(12)}px;
    flex-direction: row;
    align-items: center;
    padding: ${scales(16)}px;
    border-radius: ${scales(8)}px;
    background-color: ${p => p.theme.grey6};
    gap: ${scales(12)}px;
`;

const ViewIcon = styled.View`
    width: ${scales(40)}px;
    height: ${scales(40)}px;
    border-radius: ${scales(20)}px;
    background-color: ${p => p.theme.white};
    justify-content: center;
    align-items: center;
`;

const ViewDesc = styled.View`
    flex: 1;
    gap: ${scales(4)}px;
`;

const Label = styled(Text)``;

const Desc = styled(Text)`
    color: ${p => p.theme.grey1};
`;
