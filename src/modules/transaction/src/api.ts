import Fetch from 'service/api-request';

export const checkReceiveCadaWallet = (data: transaction.ICheckReceiveCadaWalletRequestParams) => {
    return Fetch.post<transaction.IReceiver>('/user/user-wallet-info', data);
};

export const sendWalletToWallet = (data: transaction.ISendWalletToWalletRequestParams) => {
    return Fetch.post('/transaction/wallet-to-wallet', data)
}
