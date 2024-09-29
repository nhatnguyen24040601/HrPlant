import {useSelector} from 'react-redux';

import {TGLOBAL_STATE} from 'redux/rootReducer';

export const useMyWallets = () => {
    return useSelector((state: TGLOBAL_STATE) => state.wallet.myWallets);
};

export const useSelectingWallet = () => {
    return useSelector((state: TGLOBAL_STATE) => state.wallet.myWallets.find(item => item.selecting));
};
