import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RegisterProvider} from 'modules/register/src/context';
import RootStack from 'navigation';
import {persistor, store} from 'redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FirstInforProvider} from 'modules/first-infor/src/context';
import {SendTransactionProvider} from 'modules/transaction/src/context';
import Toast from 'react-native-toast-message';
import {PaperProvider} from 'react-native-paper';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import KeyboardProvider from 'providers/Keyboard';
import ModalGroup from 'navigation/views/ModalGroup';
import {useScreenGuard} from 'service/screen-guard';
import ThemeProvider from 'theme/provider/ThemeProvider';

registerTranslation('en', enGB);

interface ComposeProps {
    providers: Array<React.JSXElementConstructor<React.PropsWithChildren<unknown>>>;
    children: React.ReactNode;
}

const App = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <GestureHandlerRootView style={{flex: 1}}>
                        <ComposeProvider
                            providers={[
                                KeyboardProvider,
                                RegisterProvider,
                                FirstInforProvider,
                                SendTransactionProvider,
                                ThemeProvider,
                            ]}>
                            <Toast />
                            <RootStack />
                            <ModalGroup />
                        </ComposeProvider>
                    </GestureHandlerRootView>
                </PersistGate>
            </PaperProvider>
        </Provider>
    );
};

const ComposeProvider = (props: ComposeProps) => {
    const {providers = [], children} = props;
    useScreenGuard();

    return (
        <>
            {providers.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>;
            }, children)}
        </>
    );
};

export default App;
