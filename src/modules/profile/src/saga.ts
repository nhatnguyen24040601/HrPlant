import {all, call, put, takeLatest} from 'typed-redux-saga';

import {getProfileAction} from './actions';
import {getProfile} from './api';

export default function* watchProfile() {
    return yield all([takeLatest(getProfileAction.request, getProfileSaga)]);
}

function* getProfileSaga(action: ReturnType<typeof getProfileAction.request>) {
    try {
        const res = yield* call(getProfile);
        yield put(getProfileAction.success(res));
    } catch (err) {
        console.log('getProfileSaga error', err);
    }
}
