import {all} from 'redux-saga/effects';

import watchLogin from 'modules/login/src/saga';
import watchWallet from 'modules/wallets/src/saga';
import watchProfile from 'modules/profile/src/saga';

export default function* rootSaga() {
    yield all([watchLogin(), watchWallet(), watchProfile()]);
}
