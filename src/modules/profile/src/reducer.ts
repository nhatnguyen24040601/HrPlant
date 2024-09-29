import {ActionType, createReducer} from 'typesafe-actions';

import persistReducerUtil from 'redux/persists';
import {logoutAction} from 'modules/login/src/actions';
import {getProfileAction} from './actions';
import {TypeRegister} from 'utils/enum';

type TActions = typeof logoutAction | typeof getProfileAction.success;

const initState: profile.IState = {
    profile: {
        userId: 0,
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        country: '',
        city: '',
        state: '',
        postcode: '',
        businessId: 0,
        pincode: '',
        createdDate: '',
        createdBy: 0,
        updatedDate: '',
        updatedBy: 0,
        accountType: TypeRegister.Persional,
        businessName: '',
        businessNumber: '',
        isFirstLogin: false,
    },
};

const profileReducer = createReducer<profile.IState, ActionType<TActions>>(initState)
    .handleAction(logoutAction, () => {
        return initState;
    })
    .handleAction(getProfileAction.success, (state, action) => {
        return {
            ...state,
            profile: action.payload,
        };
    });

export default persistReducerUtil('profile', profileReducer, ['profile']);
