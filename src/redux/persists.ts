import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export default function persistReducerUtil(
    key: string,
    reducer: Reducer,
    whitelist?: string[],
    sensitiveInfoWhitelist?: string[],
    version: number = -1
): Reducer {
    const persistConfig = {
        storage: AsyncStorage,
        key,
        whitelist,
        debug: __DEV__,
        stateReconciler: autoMergeLevel2,
        version,
    };

    return persistReducer(persistConfig, reducer);
}
