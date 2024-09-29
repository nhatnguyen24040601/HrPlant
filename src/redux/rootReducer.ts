import authReducer from 'modules/login/src/reducer';
import profileReducer from 'modules/profile/src/reducer';
import settingReducer from 'modules/setting/src/reducer';
import walletReducer from 'modules/wallets/src/reducer';

export type TGLOBAL_STATE = {
    auth: login.IState;
    wallet: wallet.IState;
    profile: profile.IState;
    setting: setting.IState;
};

const GLOBAL_STATE = {
    auth: authReducer,
    wallet: walletReducer,
    profile: profileReducer,
    setting: settingReducer,
};

export default GLOBAL_STATE;
