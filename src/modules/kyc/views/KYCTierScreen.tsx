import React from 'react';
import styled, {toStyleSheet} from 'styled-components/native';

import SVGIcon from 'assets/svg';
import GlobalHeader from 'components/GlobalHeader';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {css} from 'styled-components';
import GlobalSubmitButton from 'components/GlobalSubmitButton';
import {launchSNSMobileSDK} from '../src/utils';
import {useColors} from 'theme/provider/ThemeProvider';

interface IItemDetail {
    tier: 1 | 2 | 3;
    detail: string[];
    colorText: string;
    isCurrent?: boolean;
    isNext?: boolean;
    backgroundColor: string;
    textDetailColor: string;
    textBackgroundColor: string;
    textBackgroundOpacity: number;
}

const KYCTierScreen = () => {
    const Colors = useColors();
    const dataTier: IItemDetail[] = [
        {
            tier: 1,
            detail: ['Email address', 'Phone number'],
            colorText: Colors.brown1,
            isNext: true,
            backgroundColor: Colors.red4,
            textDetailColor: Colors.black1,
            textBackgroundColor: Colors.brown2,
            textBackgroundOpacity: 0.1,
        },
        {
            tier: 2,
            detail: ['ID verification', 'Liveness check', 'Video verification'],
            colorText: Colors.white,
            backgroundColor: Colors.blue5,
            textDetailColor: Colors.white,
            textBackgroundColor: Colors.white,
            textBackgroundOpacity: 0.4,
        },
        {
            tier: 3,
            detail: ['ID verification', 'Liveness check', 'Video verification'],
            colorText: Colors.black,
            backgroundColor: Colors.yellow2,
            textDetailColor: Colors.black1,
            textBackgroundColor: Colors.yellow3,
            textBackgroundOpacity: 0.1,
        },
    ];

    const onUpgradePressed = () => {
        launchSNSMobileSDK();
    };

    const getTextPosition = (item: IItemDetail) => {
        if (item.isCurrent) {
            return 'Current level';
        } else if (item.isNext) {
            return 'Next level';
        }
        return '';
    };

    const renderItemHeader = (item: IItemDetail) => {
        return (
            <ViewHeader>
                <Row>
                    <SVGIcon name={`ic-tier-${item.tier}`} size={scales(24)} />
                    <TierName color={item.colorText} type="s_12_18">
                        Tier {item.tier} account
                    </TierName>
                </Row>
                <TierName color={item.colorText} type="s_12_18">
                    {getTextPosition(item)}
                </TierName>
            </ViewHeader>
        );
    };

    const renderDetailItem = (item: IItemDetail) => {
        return (
            <DetailItem>
                {item.detail.map((detail) => (
                    <TextDetail color={item.textDetailColor} type="r_12_18" key={detail}>
                        {detail}
                    </TextDetail>
                ))}
            </DetailItem>
        );
    };

    const renderItem = (item: IItemDetail) => {
        return (
            <ViewItem backgroundColor={item.backgroundColor}>
                {renderItemHeader(item)}
                {renderDetailItem(item)}
                <ViewTextBackground>
                    <TextBackground
                        opacity={item.textBackgroundOpacity}
                        color={item.textBackgroundColor}
                        type="b_130_156">
                        {item.tier}
                    </TextBackground>
                </ViewTextBackground>
            </ViewItem>
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="KYC levels" showBorder />
            <Content showsVerticalScrollIndicator={false} contentContainerStyle={toStyleSheet(ContentScroll)}>
                {dataTier.map(renderItem)}
            </Content>
            <SubmitButton text="Upgrade to tier 1" onPress={onUpgradePressed} />
        </Wrapper>
    );
};

export default KYCTierScreen;

const ContentScroll = css`
    padding: ${scales(16)}px ${scales(20)}px;
    gap: ${scales(24)}px;
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const ViewItem = styled.View<{backgroundColor}>`
    padding: ${scales(16)}px;
    background-color: ${(p) => p.backgroundColor};
    border-radius: ${scales(8)}px;
    gap: ${scales(40)}px;
    overflow: hidden;
    justify-content: space-between;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ViewHeader = styled(Row)`
    justify-content: space-between;
`;

const TierName = styled(Text)<{color: string}>`
    margin-left: ${scales(8)}px;
    color: ${(p) => p.color};
`;

const Content = styled.ScrollView`
    margin-bottom: ${scales(24)}px;
`;

const DetailItem = styled.View`
    gap: ${scales(16)}px;
`;

const TextDetail = styled(Text)<{color: string}>`
    color: ${(p) => p.color};
`;

const TextBackground = styled(Text)<{color: string; opacity: number}>`
    color: ${(p) => p.color};
    opacity: 0.1;
    opacity: ${(p) => p.opacity};
`;

const ViewTextBackground = styled.View`
    position: absolute;
    right: ${scales(33)}px;
    bottom: -${scales(38)}px;
    width: ${scales(78)}px;
    justify-content: flex-start;
`;

const SubmitButton = styled(GlobalSubmitButton)`
    width: ${CommonSize.scrWidth - scales(32)}px;
    align-self: center;
    margin-bottom: ${CommonSize.bottomSpace}px;
`;
