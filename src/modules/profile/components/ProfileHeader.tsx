import React from 'react';
import styled from 'styled-components/native';

import {useProfile} from '../src/selector';

import SVGIcon from 'assets/svg';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import CommonSize, {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ProfileHeader = () => {
    const profile = useProfile();
    const Colors = useColors();

    return (
        <Wrapper>
            <ViewName>
                <Hello type="s_24_29">Hello {profile.firstName}!</Hello>
                <ViewTier>
                    {/* <SVGIcon name="ic-tier-1" size={scales(24)} /> */}
                    <TierName type="s_12_14">Tier 0 account</TierName>
                    <SVGIcon name="ic-warning" size={scales(16)} color={Colors.green1} />
                </ViewTier>
            </ViewName>
            <Avatar size={scales(64)} />
        </Wrapper>
    );
};

export default ProfileHeader;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${CommonSize.statusBarHeight + 24}px ${scales(16)}px 0px ${scales(16)}px;
`;

const Hello = styled(Text)``;

const ViewName = styled.View`
    align-items: flex-start;
`;

const ViewTier = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${scales(4)}px;
    background-color: ${(p) => p.theme.white};
    border-radius: ${scales(40)}px;
    gap: ${scales(4)}px;
    margin-top: ${scales(10)}px;
`;

const TierName = styled(Text)`
    color: ${(p) => p.theme.green1};
`;
