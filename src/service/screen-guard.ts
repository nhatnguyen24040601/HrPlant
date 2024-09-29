import {useEffect} from 'react';
import ScreenGuardModule from 'react-native-screenguard';

import {useTheme} from 'modules/setting/src/selector';

import {getColors} from 'theme/CommonColors';

export const useScreenGuard = () => {
    const theme = useTheme();

    useEffect(() => {
        // ScreenGuardModule.register({
        //     backgroundColor: getColors().white,
        //     timeAfterResume: 2000,
        // });
    }, [theme]);
};
