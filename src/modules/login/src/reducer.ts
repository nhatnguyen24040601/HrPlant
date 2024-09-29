import {ActionType, createReducer} from 'typesafe-actions';

import {hideIntro, loginAction, logoutAction} from 'modules/login/src/actions';
import {reset} from 'navigation/src/utils';
import persistReducerUtil from 'redux/persists';

type TActions = typeof loginAction.success | typeof hideIntro | typeof logoutAction;

const initState: login.IState = {
    access_token: '',
    hideIntro: false,
};

const authReducer = createReducer<login.IState, ActionType<TActions>>(initState)
    .handleAction(loginAction.success, (state, action) => ({
        ...state,
        access_token: action.payload.token,
    }))
    .handleAction(hideIntro, (state, action) => ({
        ...state,
        hideIntro: true,
    }))
    .handleAction(logoutAction, (state, action) => {
        reset('LoginScreen');
        return {
            ...state,
            access_token: '',
        };
    });

export default persistReducerUtil('auth', authReducer, ['access_token', 'hideIntro']);
