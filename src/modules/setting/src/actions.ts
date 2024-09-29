import {createAction} from 'typesafe-actions';

import {ThemeName} from 'utils/enum';

export const updateShowBalanceAction = createAction('SETTING/UPDATE_SHOW_BALANCE')();

export const changeThemeAction = createAction('SETTING/CHANGE_THEME')<{theme: ThemeName}>();
