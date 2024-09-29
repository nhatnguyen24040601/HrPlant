import React from 'react';
import {StyleSheet} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Animated, {useAnimatedStyle, useSharedValue, withSequence, withTiming} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import SVGIcon, {TNameOfIconSVG} from 'assets/svg';
import Text from 'components/Text';
import ActivityScreen from 'modules/activities/views/ActivityScreen';
import HomeScreen from 'modules/home/views/HomeScreen';
import AccountScreen from 'modules/profile/views/AccountScreen';
import {useTheme} from 'modules/setting/src/selector';
import WalletScreen from 'modules/wallets/views/WalletScreen';
import {navigate as appNavigate} from 'navigation/src/utils';
import {getColors} from 'theme/CommonColors';
import {scales} from 'theme/CommonSize';
import {useColors} from 'theme/provider/ThemeProvider';

const ButtonTab = (props) => {
    const {routeName, selectedTab, navigate} = props;
    const scaleAnim = useSharedValue(1);

    const getName = (routeNameProp) => {
        let name = '';
        switch (routeNameProp) {
            case 'HomeScreen':
                name = 'Home';
                break;
            case 'WalletScreen':
                name = 'Wallet';
                break;
            case 'ActivityScreen':
                name = 'Activities';
                break;
            case 'AccountScreen':
                name = 'Account';
                break;
        }
        return name;
    };

    const getIcon = (routeNameProp, selectedTabProp) => {
        let iconUnselected = '' as TNameOfIconSVG;
        let iconSelected = '' as TNameOfIconSVG;
        switch (routeNameProp) {
            case 'HomeScreen':
                iconUnselected = 'ic-home-unselected';
                iconSelected = 'ic-home-selected';
                break;
            case 'WalletScreen':
                iconUnselected = 'ic-wallet-unselected';
                iconSelected = 'ic-wallet-selected';
                break;
            case 'ActivityScreen':
                iconUnselected = 'ic-activities-unselected';
                iconSelected = 'ic-activities-selected';
                break;
            case 'AccountScreen':
                iconUnselected = 'ic-account-unselected';
                iconSelected = 'ic-account-selected';
                break;
        }

        return <SVGIcon name={selectedTabProp === routeNameProp ? iconSelected : iconUnselected} size={scales(24)} />;
    };

    const animatedStyle = useAnimatedStyle(
        () => ({
            transform: [{scale: routeName === selectedTab ? scaleAnim.value : 1}],
        }),
        [routeName, selectedTab]
    );

    const onTabbarPressed = () => {
        navigate(routeName);
        scaleAnim.value = withSequence(withTiming(0.8, {duration: 200}), withTiming(1, {duration: 200}));
    };

    return (
        <ButtonTabbar onPress={onTabbarPressed} activeOpacity={0.7}>
            <ViewIcon style={animatedStyle}>{getIcon(routeName, selectedTab)}</ViewIcon>
            <TabName isSelected={routeName === selectedTab} type="s_10_12">
                {getName(routeName)}
            </TabName>
        </ButtonTabbar>
    );
};

const BottomStack = () => {
    const Colors = useColors();
    const scaleAnim = useSharedValue(1);

    const dispatch = useDispatch();
    const theme = useTheme();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: scaleAnim.value}],
    }));

    const renderTabBar = (buttonProps) => {
        return <ButtonTab {...buttonProps} />;
    };

    return (
        <CurvedBottomBar.Navigator
            screenOptions={{headerShown: false}}
            type="DOWN"
            style={{
                paddingBottom: scales(20),
                shadowColor: Colors.black,
                shadowOffset: {height: -scales(3), width: 0},
                shadowRadius: scales(3),
                shadowOpacity: 0.1,
            }}
            bgColor="white"
            circleWidth={50}
            initialRouteName="HomeScreen"
            renderCircle={() => (
                <ViewButtonCenter style={animatedStyle}>
                    <ButtonCenter
                        style={styles.shadow}
                        onPressIn={() => {
                            scaleAnim.value = withTiming(0.8, {duration: 100});
                        }}
                        onPressOut={() => {
                            appNavigate('ResultGlobalScreen')
                        }}>
                        <SVGIcon name="ic-send" size={scales(30)} />
                    </ButtonCenter>
                    <TabNameCenter type="s_10_12">Send</TabNameCenter>
                </ViewButtonCenter>
            )}
            height={50}
            tabBar={renderTabBar}
            // @ts-ignore
            bottomColor={Colors.white}>
            <CurvedBottomBar.Screen name="HomeScreen" position="LEFT" component={HomeScreen} />
            <CurvedBottomBar.Screen name="WalletScreen" position="LEFT" component={WalletScreen} />
            <CurvedBottomBar.Screen name="ActivityScreen" position="RIGHT" component={ActivityScreen} />
            <CurvedBottomBar.Screen name="AccountScreen" position="RIGHT" component={AccountScreen} />
        </CurvedBottomBar.Navigator>
    );
};

export default BottomStack;

const styles = StyleSheet.create({
    shadow: {
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: getColors().black,
    },
});

const TabName = styled(Text)<{isSelected: boolean}>`
    margin-top: ${scales(4)}px;
    color: ${(p) => (p.isSelected ? p.theme.green1 : p.theme.grey8)};
`;

const TabNameCenter = styled(Text)`
    position: absolute;
    bottom: ${12}px;
    color: ${(p) => p.theme.grey8};
`;

const ButtonTabbar = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

const ViewIcon = styled(Animated.View)`
    width: ${scales(24)}px;
    height: ${scales(24)}px;
    justify-content: center;
    align-items: center;
`;

const ViewButtonCenter = styled(Animated.View)`
    align-items: center;
`;

const ButtonCenter = styled.TouchableOpacity`
    margin: 0px ${scales(10)}px;
    width: ${scales(60)}px;
    height: ${scales(60)}px;
    border-radius: ${scales(30)}px;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.green1};
    bottom: ${scales(35)}px;
    border-width: ${scales(2)}px;
    border-color: ${(p) => p.theme.white};
`;
