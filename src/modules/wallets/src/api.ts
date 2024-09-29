import Fetch from 'service/api-request';

export const getMyWallets = (data: wallet.IGetMyWalletRequestParams) => {
    return Fetch.post<{listModels: wallet.IWallet[]}>('/wallet/my-wallets', data);
};
