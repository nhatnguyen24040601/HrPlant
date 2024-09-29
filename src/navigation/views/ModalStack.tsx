import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstInforScreen from 'modules/first-infor/views/FirstInforScreen';
import {RootStackParamList} from 'navigation/src/typing';
import React from 'react';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const ModalStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name="FirstInforScreen"
                component={FirstInforScreen}
                options={{presentation: 'modal', gestureEnabled: false}}
            />
        </StackNavigator.Navigator>
    );
};

export default ModalStack;
