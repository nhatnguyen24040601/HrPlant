import React, {ReactElement} from 'react';
import {KeyboardProvider as KeyboardProviderOrigin} from 'react-native-keyboard-controller';

const KeyboardProvider = ({children}: {children: ReactElement}) => {
    return <KeyboardProviderOrigin statusBarTranslucent={true}>{children}</KeyboardProviderOrigin>;
};

export default KeyboardProvider;
