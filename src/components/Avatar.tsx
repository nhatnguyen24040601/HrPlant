import React from 'react';
import {ImageProps} from 'react-native';
import Config from 'react-native-config';
import styled from 'styled-components/native';

import Images from 'assets/images';

import {scales} from 'theme/CommonSize';
import Text from './Text';
import {useProfile} from 'modules/profile/src/selector';

interface IProps {
    url?: string;
    size?: number;
    onPress?: () => void;
    char?: string;
}

const Avatar = (props: IProps) => {
    const {url, size, onPress, char} = props;
    const profile = useProfile();

    return (
        <Wrapper onPress={onPress} disabled={!onPress} size={size}>
            {!url && <CharName type={`s_${size / 2}_${size / 2}`}>{char || profile?.firstName?.[0]}</CharName>}
        </Wrapper>
    );
};

export default Avatar;

const Wrapper = styled.TouchableOpacity<{size?: number}>`
    background-color: ${(p) => p.theme.green6};
    width: ${(p) => scales(p.size)}px;
    height: ${(p) => scales(p.size)}px;
    border-radius: ${(p) => scales(p.size)}px;
    justify-content: center;
    align-items: center;
`;

const SImage = styled.Image<{width?: number; height?: number}>`
    width: ${(p) => p.width || scales(40)}px;
    height: ${(p) => p.height || scales(40)}px;
    border-radius: ${(p) => p.width || scales(40)}px;
`;

const CharName = styled(Text)`
    color: ${(p) => p.theme.white};
`;
