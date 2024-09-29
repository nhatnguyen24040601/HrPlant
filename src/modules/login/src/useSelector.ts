import {useSelector} from 'react-redux';

import {TGLOBAL_STATE} from 'redux/rootReducer';

export const useAccessToken = () => {
    return useSelector((state: TGLOBAL_STATE) => state.auth.access_token);
};

export const useHideIntro = () => {
    return useSelector((state: TGLOBAL_STATE) => state.auth.hideIntro);
};
