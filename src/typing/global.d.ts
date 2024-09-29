/* eslint-disable no-var */
export declare global {
    var showVerifyUser: () => void;
    var hideVerifyUser: () => void;
    var showToast: () => void;
    var showMyWallets: (onChangeWallet?: (wallet: wallet.IWallet) => void) => void;
    var showPasscode: () => void;
}
