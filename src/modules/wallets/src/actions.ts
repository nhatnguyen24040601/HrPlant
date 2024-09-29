import {createAction, createAsyncAction} from 'typesafe-actions';

export const getMyWalletsAction = createAsyncAction(
    'WALLET/GET_MY_WALLETS',
    'WALLET/GET_MY_WALLETS_SUCCESS',
    'WALLET/GET_MY_WALLETS_FAIL'
)<wallet.IGetMyWalletActionPayload, wallet.IWallet[], void>();

export const selectWalletAction = createAction('WALLET/SELECT_WALLET')<{walletId: number}>();
