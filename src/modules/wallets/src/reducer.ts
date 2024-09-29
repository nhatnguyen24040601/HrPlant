import {ActionType, createReducer} from 'typesafe-actions';

import {getMyWalletsAction, selectWalletAction} from './actions';

import {updateSelectWallet} from './utils';

import persistReducerUtil from 'redux/persists';

type TActions = typeof getMyWalletsAction.success | typeof selectWalletAction;

const initState: wallet.IState = {
    myWallets: [],
    idWalletSelected: 0,
};

const walletReducer = createReducer<wallet.IState, ActionType<TActions>>(initState)
    .handleAction(getMyWalletsAction.success, (state, action) => {
        const {listWallet, selectingWalletId} = updateSelectWallet(action.payload, state.idWalletSelected);
        return {
            ...state,
            myWallets: listWallet,
            idWalletSelected: selectingWalletId,
        };
    })
    .handleAction(selectWalletAction, (state, action) => {
        const {listWallet, selectingWalletId} = updateSelectWallet(state.myWallets, action.payload.walletId);
        return {
            ...state,
            myWallets: listWallet,
            idWalletSelected: selectingWalletId,
        };
    });

export default persistReducerUtil('wallet', walletReducer, ['myWallets', 'idWalletSelected']);
