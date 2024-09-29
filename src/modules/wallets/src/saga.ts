import {all, call, put, takeLatest} from 'typed-redux-saga';

import {getMyWalletsAction} from './actions';
import {getMyWallets} from './api';

export default function* watchWallet() {
    return yield all([takeLatest(getMyWalletsAction.request, getMyWalletsSaga)]);
}

function* getMyWalletsSaga(action: ReturnType<typeof getMyWalletsAction.request>) {
    try {
        const res = yield* call(getMyWallets, action.payload.data);
        yield put(getMyWalletsAction.success(res.listModels));
    } catch (err) {
        console.log('loginSaga error', err);
    }
}
