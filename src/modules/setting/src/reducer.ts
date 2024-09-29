import {ActionType, createReducer} from 'typesafe-actions';

import {changeThemeAction, updateShowBalanceAction} from './actions';

import persistReducerUtil from 'redux/persists';
import {colorInstance} from 'theme/CommonColors';
import {ThemeName} from 'utils/enum';

type TActions = typeof updateShowBalanceAction | typeof changeThemeAction;

const initState: setting.IState = {
    showBalance: false,
    theme: ThemeName.LIGHT,
};

const settingReducer = createReducer<setting.IState, ActionType<TActions>>(initState)
    .handleAction(updateShowBalanceAction, (state) => ({
        ...state,
        showBalance: !state.showBalance,
    }))
    .handleAction(changeThemeAction, (state, action) => {
        colorInstance.setTheme(action.payload.theme);
        return {
            ...state,
            theme: action.payload.theme,
        };
    });

export default persistReducerUtil('setting', settingReducer, ['showBalance', 'theme']);
