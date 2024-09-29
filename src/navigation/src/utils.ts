import { createNavigationContainerRef, RouteProp, StackActions, useRoute } from '@react-navigation/native';
import { TabActions } from '@react-navigation/native';

import { RootStackParamList } from './typing';

export const navigationRef = createNavigationContainerRef();

export const navigate = <ScreenName extends keyof RootStackParamList, Params extends RootStackParamList[ScreenName]>(
    name: ScreenName,
    params?: Params
) => {
    if (navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.navigate(name, params);
    }
};

export const reset = <ScreenName extends keyof RootStackParamList, Params extends RootStackParamList[ScreenName]>(
    name: ScreenName,
    params?: Params
) => {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name, params }],
        });
    }
};

export const replace = <ScreenName extends keyof RootStackParamList, Params extends RootStackParamList[ScreenName]>(
    name: ScreenName,
    params?: Params
) => {
    navigationRef.dispatch(StackActions.replace(name, params));
};

export const goBack = () => {
    navigationRef.goBack();
};

export const jumpTo = <ScreenName extends keyof RootStackParamList, Params extends RootStackParamList[ScreenName]>(
    name: ScreenName,
    params?: Params
) => {
    const jumpToAction = TabActions.jumpTo(name, params);
    navigationRef.dispatch(jumpToAction);
};

export const getCurrentRouteName = () => {
    return navigationRef.getCurrentRoute()?.name || '';
};

export const stackScreen = <ScreenName extends keyof RootStackParamList, Params extends RootStackParamList[ScreenName]>(
    name: ScreenName,
    params?: Params
) => {
    navigationRef.dispatch(StackActions.push(name, params));
};

export const goToInitialRoute = () => {
    navigate('SplashScreen');
};

export const useNavigationParams = <T extends keyof RootStackParamList>(params: T): Readonly<RootStackParamList[T]> => {
    const route = useRoute<RouteProp<RootStackParamList, T>>();
    return (route?.params || {}) as Readonly<RootStackParamList[T]>;
};
