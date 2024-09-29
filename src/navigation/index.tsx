import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {RootStackParamList} from './src/typing';
import {goToInitialRoute, navigationRef} from './src/utils';
import BottomStack from './views/BottomStack';

import AddWalletScreen from 'modules/add-wallet/views/AddWalletScreen';
import SelectCurrenciesScreen from 'modules/add-wallet/views/SelectCurrenciesScreen';
import ChangePassScreen from 'modules/change-pass/views/ChangePassScreen';
import FirstInforScreen from 'modules/first-infor/views/FirstInforScreen';
import FundWalletScreen from 'modules/fund/views/FundWalletScreen';
import IntroScreen from 'modules/intro/views/IntroScreen';
import WelcomScreen from 'modules/intro/views/WelcomScreen';
import KYCTierScreen from 'modules/kyc/views/KYCTierScreen';
import LoginScreen from 'modules/login/views/LoginScreen';
import VerifyOTPTransaction from 'modules/otp/views/VerifyOTPTransaction';
import IntroPasscode from 'modules/passcode/views/IntroPasscode';
import SetupPasscodeScreen from 'modules/passcode/views/SetupPasscodeScreen';
import SetupPasscodeSuccess from 'modules/passcode/views/SetupPasscodeSuccess';
import TransactionPasscode from 'modules/passcode/views/TransactionPasscode';
import EditProfileScreen from 'modules/profile/views/EditProfileScreen';
import ProfileInforScreen from 'modules/profile/views/ProfileInforScreen';
import CreateReceiveQR from 'modules/receive/views/CreateReceiveQR';
import QRCodeReceive from 'modules/receive/views/QRCodeReceive';
import ReceiveEmail from 'modules/receive/views/ReceiveEmail';
import ReceiveTypeScreen from 'modules/receive/views/ReceiveTypeScreen';
import RegisterScreen from 'modules/register/views/RegisterScreen';
import SelectCountriesScreen from 'modules/register/views/SelectCountriesScreen';
import SuccessRegisterScreen from 'modules/register/views/SuccessRegisterScreen';
import ResultGlobalScreen from 'modules/result-global/view/ResultGlobal';
import SplashScreen from 'modules/splash/views/SplashScreen';
import SwapScreen from 'modules/swap/views/SwapScreen';
import InstantPayment from 'modules/transaction/views/InstantPayment';
import MobileMoney from 'modules/transaction/views/MobileMoney';
import PayManualBank from 'modules/transaction/views/PayManualBank';
import PaymentMethodScreen from 'modules/transaction/views/PaymentMethodScreen';
import PaymentResultScreen from 'modules/transaction/views/PaymentResultScreen';
import PayWithWallet from 'modules/transaction/views/PayWithWallet';
import RecipientEmailOrPhone from 'modules/transaction/views/RecipientEmailOrPhone';
import RecipientInforScreen from 'modules/transaction/views/RecipientInforScreen';
import RecipientScreen from 'modules/transaction/views/RecipientScreen';
import SendScreen from 'modules/transaction/views/SendScreen';
import SendToCadaScreen from 'modules/transaction/views/SendToCadaScreen';
import SendToEmail from 'modules/transaction/views/SendToEmail';
import SendToTelephone from 'modules/transaction/views/SendToTelephone';
import DetailWallet from 'modules/wallets/views/DetailWallet';
import WalletAccountDetail from 'modules/wallets/views/WalletAccountDetail';
import AddWithdrawBank from 'modules/withdraw/views/AddWithdrawBank';
import WithdrawToBank from 'modules/withdraw/views/WithdrawToBank';
import {useAppState} from 'service/app-state';
import {useColors} from 'theme/provider/ThemeProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    const Colors = useColors();
    useAppState();

    return (
        <NavigationContainer ref={navigationRef} onReady={goToInitialRoute}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {backgroundColor: Colors.white},
                    animation: 'slide_from_right',
                }}
                initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="IntroScreen" component={IntroScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomScreen} />
                <Stack.Screen name="SelectCountriesScreen" component={SelectCountriesScreen} />
                <Stack.Screen name="Main" component={BottomStack} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="SuccessRegisterScreen" component={SuccessRegisterScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="AddWalletScreen" component={AddWalletScreen} />
                <Stack.Screen name="SelectCurrenciesScreen" component={SelectCurrenciesScreen} />
                <Stack.Screen name="ProfileInforScreen" component={ProfileInforScreen} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
                <Stack.Screen name="SendScreen" component={SendScreen} />
                <Stack.Screen name="RecipientScreen" component={RecipientScreen} />
                <Stack.Screen name="SendToCadaScreen" component={SendToCadaScreen} />
                <Stack.Screen name="RecipientInforScreen" component={RecipientInforScreen} />
                <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
                <Stack.Screen name="PayWithWallet" component={PayWithWallet} />
                <Stack.Screen name="PaymentResultScreen" component={PaymentResultScreen} />
                <Stack.Screen name="SetupPasscodeScreen" component={SetupPasscodeScreen} />
                <Stack.Screen name="KYCTierScreen" component={KYCTierScreen} />
                <Stack.Screen name="SetupPasscodeSuccess" component={SetupPasscodeSuccess} />
                <Stack.Screen name="IntroPasscode" component={IntroPasscode} />
                <Stack.Screen name="DetailWallet" component={DetailWallet} />
                <Stack.Screen name="FundWalletScreen" component={FundWalletScreen} />
                <Stack.Screen name="WalletAccountDetail" component={WalletAccountDetail} />
                <Stack.Screen name="ReceiveTypeScreen" component={ReceiveTypeScreen} />
                <Stack.Screen name="ReceiveEmail" component={ReceiveEmail} />
                <Stack.Screen name="WithdrawToBank" component={WithdrawToBank} />
                <Stack.Screen name="AddWithdrawBank" component={AddWithdrawBank} />
                <Stack.Screen name="SwapScreen" component={SwapScreen} />
                <Stack.Screen name="PayManualBank" component={PayManualBank} />
                <Stack.Screen name="RecipientEmailOrPhone" component={RecipientEmailOrPhone} />
                <Stack.Screen name="SendToEmail" component={SendToEmail} />
                <Stack.Screen name="SendToTelephone" component={SendToTelephone} />
                <Stack.Screen name="CreateReceiveQR" component={CreateReceiveQR} />
                <Stack.Screen name="QRCodeReceive" component={QRCodeReceive} />
                <Stack.Screen name="MobileMoney" component={MobileMoney} />
                <Stack.Screen name="InstantPayment" component={InstantPayment} />
                <Stack.Screen name="TransactionPasscode" component={TransactionPasscode} />
                <Stack.Screen name="VerifyOTPTransaction" component={VerifyOTPTransaction} />
                <Stack.Screen name="ResultGlobalScreen" component={ResultGlobalScreen} options={{gestureEnabled: false}} />

                {/* Modal */}
                <Stack.Screen
                    name="FirstInforScreen"
                    component={FirstInforScreen}
                    options={{presentation: 'modal', gestureEnabled: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
