import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';

import {useProfile} from 'modules/profile/src/selector';

export const useAppState = () => {
    const appState = useRef(AppState.currentState);
    const profile = useProfile();

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState.match(/background/)) {
                if (profile) {
                    // global.showPasscode();
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);
};
