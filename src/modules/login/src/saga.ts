import {all, call, put, takeLatest} from 'typed-redux-saga';

import {loginAction} from './actions';
import {login} from './api';

import {getProfileAction} from 'modules/profile/src/actions';
import {reset} from 'navigation/src/utils';
import Fetch from 'service/api-request';

export default function* watchLogin() {
    return yield all([takeLatest(loginAction.request, loginSaga)]);
}

function* loginSaga(action: ReturnType<typeof loginAction.request>) {
    try {
        const res = yield* call(login, action.payload.data);
        Fetch.access_token = res.token;
        yield put(getProfileAction.request());
        yield put(
            loginAction.success({
                token: res.token,
            })
        );
        action.payload.onSuccess();
    } catch (err) {
        console.log('loginSaga error', err);
        action.payload.onFail(err);
    }
}
