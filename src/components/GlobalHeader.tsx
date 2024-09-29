import React, {ReactElement, useCallback} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

import Text from './Text';

import SVGIcon from 'assets/svg';
import {goBack} from 'navigation/src/utils';
import CommonSize, {hitSlop, scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

interface IProps {
    text?: string;
    viewLeft?: ReactElement;
    viewRight?: ReactElement;
    showBorder?: boolean;
    onBackPressed?: () => void;
    containerStyle?: ViewStyle;
}

const GlobalHeader = (props: IProps) => {
    const Colors = useColors();
    const {viewLeft, text, viewRight, showBorder, onBackPressed: customBack, containerStyle} = props;

    const onBackPressed = useCallback(() => {
        if (customBack) {
            customBack();
            return;
        }
        goBack();
    }, [customBack]);

    const renderViewLeft = useCallback(() => {
        return (
            <ViewLeft>
                {viewLeft ?? (
                    <TouchableOpacity hitSlop={hitSlop} onPress={onBackPressed}>
                        <SVGIcon name="ic-back" size={scales(24)} color={Colors.black1} />
                    </TouchableOpacity>
                )}
            </ViewLeft>
        );
    }, [viewLeft, onBackPressed]);

    const renderViewRight = useCallback(() => {
        return <ViewRight>{viewRight}</ViewRight>;
    }, [viewRight]);

    const renderViewCenter = useCallback(() => {
        return (
            <ViewCenter>
                <Title type="b_16_24">{text}</Title>
            </ViewCenter>
        );
    }, [text]);

    return (
        <Container showBorder={showBorder} style={containerStyle}>
            {renderViewLeft()}
            {renderViewCenter()}
            {viewRight && renderViewRight()}
        </Container>
    );
};

export default GlobalHeader;

const Container = styled.View<{showBorder?: boolean}>`
    padding-top: ${scales(CommonSize.statusBarHeight + 13)}px;
    flex-direction: row;
    align-items: center;
    padding-bottom: ${scales(25)}px;
    border-bottom-width: ${scales(1)}px;
    border-bottom-color: ${(p) => (p?.showBorder ? p.theme.grey2 : p.theme.transparent)};
`;

const Title = styled(Text)`
    color: ${(p) => p.theme.black1};
    text-align: center;
`;

const ViewCenter = styled.View`
    flex: 1;
    margin: 0px ${scales(45)}px;
`;

const ViewLeft = styled.View`
    position: absolute;
    left: ${scales(15)}px;
    bottom: ${scales(25)}px;
`;

const ViewRight = styled.View`
    position: absolute;
    right: ${scales(15)}px;
    bottom: ${scales(25)}px;
`;
