import {createAction, createAsyncAction} from 'typesafe-actions';

export const loginAction = createAsyncAction('LOGIN', 'LOGIN_SUCCESS', 'LOGIN_FAIL')<
    login.LoginActionPayload,
    login.ILoginResponse,
    void
>();

export const hideIntro = createAction('HIDE_INTRO')();

export const logoutAction = createAction('Logout')();
