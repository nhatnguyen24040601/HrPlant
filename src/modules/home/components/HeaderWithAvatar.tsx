import React from 'react';
import styled from 'styled-components/native';

import SVGIcon from 'assets/svg';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

import { useProfile } from 'modules/profile/src/selector';
import CommonSize, {scales} from 'theme/CommonSize';
import { useColors } from 'theme/provider/ThemeProvider';

const HeaderWithAvatar = () => {
    const Colors = useColors();
    const profile = useProfile();
    return (
        <Wrapper>
            <Avatar size={scales(35)} />
            <Name>{profile?.firstName}</Name>
            <ViewNotice>
                <SVGIcon name="ic-bell" size={scales(24)} color={Colors.black1} />
                <Dot />
            </ViewNotice>
        </Wrapper>
    );
};

export default HeaderWithAvatar;

const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${CommonSize.statusBarHeight + 16}px 16px 16px 16px;
    gap: ${scales(8)}px;
`;

const ViewNotice = styled.View``;

const Name = styled(Text)`
    flex: 1;
`;

const Dot = styled.View`
    width: ${scales(12)}px;
    height: ${scales(12)}px;
    border-radius: ${scales(6)}px;
    background-color: ${p => p.theme.red1};
    position: absolute;
    right: -${scales(2)}px;
    top: -${scales(2)}px;
`;
