import {createAction, createAsyncAction} from 'typesafe-actions';

export const getProfileAction = createAsyncAction('PROFILE/GET', 'PROFILE/GET_SUCCESS', 'PROFILE/GET_FAIL')<
    void,
    profile.IProfile,
    void
>();

export const updateProfileLocal = createAction('PROFILE/UPDATE')<profile.IProfile>();
