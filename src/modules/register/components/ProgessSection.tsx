import React, {useContext} from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import styled from 'styled-components/native';

import {RegisterContext} from '../src/context';

import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ItemProgess = ({index}: {index: number}) => {
    const {progress} = useContext(RegisterContext);
    const Colors = useColors();

    const animatedStyles = useAnimatedStyle(() => {
        const getPercent = () => {
            if (index <= progress.tab) {
                return '100%';
            } else if (index - progress.tab === 0.5) {
                return '50%';
            } else {
                return '0%';
            }
        };

        return {
            width: withTiming(getPercent()),
        };
    });

    return <Animated.View style={[animatedStyles, {backgroundColor: Colors.green1, height: '100%'}]} />;
};

const ProgessSection = () => {
    const renderProgess = (index) => {
        return (
            <ProgressBackdrop key={index}>
                <ItemProgess index={index} />
            </ProgressBackdrop>
        );
    };

    return (
        <WrapProgess>
            {Array(4)
                .fill({})
                .map((_, index) => {
                    return renderProgess(index);
                })}
        </WrapProgess>
    );
};

export default ProgessSection;

const WrapProgess = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${scales(12)}px;
    padding: 0px ${scales(16)}px;
`;

const ProgressBackdrop = styled.View`
    flex: 1;
    height: ${scales(5)}px;
    background-color: ${(p) => p.theme.grey7};
    border-radius: ${scales(5)}px;
`;

const Progess = styled(Animated.View)`
    flex: 1;
`;
