import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';

import {useDispatch} from 'react-redux';

import {useAccessToken, useHideIntro} from 'modules/login/src/useSelector';
import {getProfileAction} from 'modules/profile/src/actions';
import {reset} from 'navigation/src/utils';
import Fetch from 'service/api-request';

const SplashScreen = () => {
    const token = useAccessToken();
    const hideIntro = useHideIntro();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            if (token) {
                Fetch.access_token = token;
                dispatch(getProfileAction.request());
                global.showPasscode();
                reset('Main');
            } else {
                if (hideIntro) {
                    reset('LoginScreen');
                } else {
                    reset('IntroScreen');
                }
            }
            BootSplash.hide({fade: true});
        }, 1500);
    }, [token]);

    return (
        <>
            <StatusBar hidden />
        </>
    );
};

export default SplashScreen;
