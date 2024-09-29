import React, {useContext, useEffect, useState} from 'react';
import {NavigationState, SceneMap, SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import styled, {toStyleSheet} from 'styled-components/native';
import LocalTransfer from '../components/LocalTransfer';
import GlobalHeader from 'components/GlobalHeader';
import InternationalTransfer from '../components/InternationalTransfer';
import CommonSize, {scales} from 'theme/CommonSize';
import {css} from 'styled-components';
import {Scene} from 'react-native-tab-view/lib/typescript/src/types';
import Text from 'components/Text';
import {SendTransactionContext} from '../src/context';
import {useColors} from 'theme/provider/ThemeProvider';
import { getColors } from 'theme/CommonColors';

interface IRoute {
    key: string;
    title: string;
}

const SendScreen = () => {
    const Colors = useColors();
    const {onReset} = useContext(SendTransactionContext);
    const [index, setIndex] = useState(0);
    const [routes] = useState<IRoute[]>([
        {key: 'international', title: 'International'},
        {key: 'local', title: 'Local'},
    ]);

    useEffect(() => {
        return () => {
            onReset();
        };
    }, []);

    const renderScene = SceneMap({
        international: InternationalTransfer,
        local: LocalTransfer,
    });

    const renderTabbarLabel = (
        tabbarLabelProps: Scene<IRoute> & {
            focused: boolean;
            color: string;
        }
    ) => {
        return (
            <TabbarLabel type="s_14_16" {...tabbarLabelProps}>
                {tabbarLabelProps.route.title}
            </TabbarLabel>
        );
    };

    const renderTabBar = (
        tabbarProps: SceneRendererProps & {
            navigationState: NavigationState<IRoute>;
        }
    ) => {
        return (
            <STabBar
                indicatorStyle={toStyleSheet(indicatorStyle)}
                activeColor={Colors.green1}
                inactiveColor={Colors.grey8}
                renderLabel={renderTabbarLabel}
                {...tabbarProps}
            />
        );
    };

    return (
        <Wrapper>
            <GlobalHeader text="Amount" />
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </Wrapper>
    );
};

export default SendScreen;

const indicatorStyle = css`
    height: ${scales(3)}px;
    background-color: ${getColors().green1};
    margin: 0px ${CommonSize.scrWidth / 8 + scales(8)}px;
    width: ${CommonSize.scrWidth / 4 - scales(16)}px;
    position: absolute;
    bottom: -2px;
`;

const Wrapper = styled.View`
    flex: 1;
    background-color: ${(p) => p.theme.white};
`;

const STabBar = styled(TabBar)`
    background-color: ${(p) => p.theme.white};
    width: 100%;
    height: ${scales(50)}px;
    justify-content: center;
    border-bottom-width: ${scales(1)}px;
    border-bottom-color: ${(p) => p.theme.grey2};
`;

const TabbarLabel = styled(Text)<{color: string}>`
    color: ${(p) => p.color};
`;
