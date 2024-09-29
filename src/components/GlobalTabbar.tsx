import React, {useCallback, useRef} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Route} from 'react-native-tab-view';
import {getColors} from 'theme/CommonColors';

import {scales} from 'theme/CommonSize';
import Fonts from 'theme/Fonts';

interface IProps {
    routes: Route[];
    index: number;
    onTabPress?: (key: string) => void;
    isScroll?: boolean;
}

const GlobalTabbar = (props: IProps) => {
    const {routes, onTabPress, index: indexTab, isScroll = false} = props;

    const renderButtonTab = useCallback(
        ({route, index}: {route: Route; index: number}) => {
            const onPress = () => {
                onTabPress(route.key);
            };
            const isSelected = index === indexTab;
            return (
                <TouchableOpacity
                    style={[styles.buttonTab, isSelected && styles.buttonSelected]}
                    key={route.key}
                    onPress={onPress}>
                    <Text style={[styles.textButtonTab, isSelected && styles.textSelected]}>{route.title}</Text>
                </TouchableOpacity>
            );
        },
        [indexTab]
    );

    if (!isScroll) {
        return (
            <View style={styles.viewNonScroll}>{routes.map((route, index) => renderButtonTab({route, index}))}</View>
        );
    } else {
        return <ScrollView horizontal>{routes.map((route, index) => renderButtonTab({route, index}))}</ScrollView>;
    }
};

export default GlobalTabbar;

const styles = StyleSheet.create({
    viewNonScroll: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    textButtonTab: {
        fontSize: scales(14),
        lineHeight: scales(20),
        ...Fonts.medium,
        color: getColors().grey2,
    },
    buttonTab: {
        paddingVertical: scales(5),
        paddingHorizontal: scales(12),
        borderRadius: scales(20),
    },
    buttonSelected: {
        backgroundColor: getColors().green1,
    },
    textSelected: {
        ...Fonts.bold,
        color: getColors().white,
    },
});
