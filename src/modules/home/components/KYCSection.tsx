import React from 'react';
import styled from 'styled-components/native';
import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import Text from 'components/Text';
import CommonSize, {hitSlop, scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

interface IItemKYC {
    title: string;
    desc: string;
    textButton: string;
    onPress: () => void;
    icon: TNameOfIconSVG;
    iconColor: string;
    iconSize: number;
}

const KYCSection = () => {
    const Colors = useColors();
    const onPressKYC = () => {};

    const onPressRefer = () => {};

    const renderItem = ({title, desc, textButton, onPress, icon, iconColor, iconSize}: IItemKYC) => {
        return (
            <WrapItem>
                <Item>
                    <SVGIcon name={icon} size={scales(iconSize)} color={iconColor} />
                    <CenterItem>
                        <Title type="s_12_18">{title}</Title>
                        <Desc type="r_10_15">{desc}</Desc>
                        <BottomButton onPress={onPress}>
                            <TextButton type="s_10_12">{textButton}</TextButton>
                            <SVGIcon name="ic-arrow-right" size={scales(16)} color={Colors.green1} />
                        </BottomButton>
                    </CenterItem>
                    <ButtonClose hitSlop={hitSlop}>
                        <SVGIcon name="ic-x" size={scales(16)} color={Colors.grey1} />
                    </ButtonClose>
                </Item>
            </WrapItem>
        );
    };

    return (
        <Wrapper>
            <Content pagingEnabled={true} horizontal showsHorizontalScrollIndicator={false}>
                {renderItem({
                    title: 'Complete your KYC',
                    desc: 'We need to verify your identity to comply with regulatory requirements. Please complete your KYC to continue using our services.',
                    textButton: 'Complete KYC',
                    onPress: onPressKYC,
                    icon: 'ic-warning',
                    iconColor: Colors.yellow1,
                    iconSize: scales(20),
                })}
                {renderItem({
                    title: 'Refer friends and families',
                    desc: 'Refer friend and get exclusive benefits! You will both enjoy 15% when they open a Cadawada account and makes a transfer or deposit.',
                    textButton: 'Refer now',
                    onPress: onPressRefer,
                    icon: 'ic-gift',
                    iconColor: Colors.green1,
                    iconSize: scales(32),
                })}
            </Content>
        </Wrapper>
    );
};

export default KYCSection;

const Wrapper = styled.View``;

const Content = styled.ScrollView``;

const CenterItem = styled.View`
    flex: 1;
    align-items: flex-start;
`;

const WrapItem = styled.View`
    width: ${CommonSize.scrWidth}px;
    padding: 0px ${scales(16)}px;
`;

const Item = styled.View`
    width: 100%;
    padding: ${scales(17)}px ${scales(13)}px;
    background-color: ${(p) => p.theme.white};
    border-radius: ${scales(8)}px;
    flex-direction: row;
    align-items: flex-start;
    gap: ${scales(10)}px;
`;

const Title = styled(Text)``;

const Desc = styled(Text)`
    color: ${(p) => p.theme.grey1};
    margin: ${scales(4)}px 0px ${scales(15)}px 0px;
`;

const BottomButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: ${scales(8)}px;
`;

const TextButton = styled(Text)`
    color: ${(p) => p.theme.green1};
`;

const ButtonClose = styled.TouchableOpacity`
    position: absolute;
    top: ${scales(5)}px;
    right: ${scales(10)}px;
`;
