import {cloneDeep} from 'lodash';

export const updateSelectWallet = (listWallet: wallet.IWallet[], idWallet?: number) => {
    if (listWallet?.length === 1) {
        return {
            listWallet: [{...listWallet[0], selecting: true}],
            selectingWalletId: listWallet[0].id,
        };
    } else {
        const newList = listWallet.map((wallet) => {
            if (wallet.id === idWallet) {
                return {...wallet, selecting: true};
            } else {
                return {...wallet, selecting: false};
            }
        });
        return {
            listWallet: newList,
            selectingWalletId: idWallet,
        };
    }
};
