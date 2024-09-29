import {useSelector} from 'react-redux';

import {TGLOBAL_STATE} from 'redux/rootReducer';

export const useShouldShowBalance = () => useSelector((state: TGLOBAL_STATE) => state.setting.showBalance);

export const useTheme = () => useSelector((state: TGLOBAL_STATE) => state.setting.theme);
