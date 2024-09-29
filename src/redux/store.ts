import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import state from 'redux/rootReducer';
import rootSaga from 'redux/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const GLOBAL_STATE = combineReducers(state);
const MIDDLEWARE: Middleware[] = [sagaMiddleware];

const reduxLog = createLogger();

if (__DEV__) {
    MIDDLEWARE.push(reduxLog);
}

const createStoreWithMiddleware = __DEV__
    ? compose(applyMiddleware(...MIDDLEWARE))(createStore)
    : applyMiddleware(...MIDDLEWARE)(createStore);

export const store = createStoreWithMiddleware(GLOBAL_STATE, undefined);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
