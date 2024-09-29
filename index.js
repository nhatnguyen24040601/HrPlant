/**
 * @format
 */

import {AppRegistry, Text, TextInput, TouchableOpacity} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';

Text.defaultProps = {}
Text.defaultProps.maxFontSizeMultiplier = 1.0
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps = TextInput.defaultProps || {}
TextInput.defaultProps.allowFontScaling = false
TextInput.defaultProps.paddingVertical = 0
// TextInput.defaultProps.placehoderColor = getColors().grey9
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {}
TouchableOpacity.defaultProps.activeOpacity = 0.6
TouchableOpacity.defaultProps.hitSlop = { top: 6, left: 6, right: 6, bottom: 6 }

AppRegistry.registerComponent(appName, () => App);
