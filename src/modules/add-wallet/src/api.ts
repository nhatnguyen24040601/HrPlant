import Fetch from 'service/api-request';

export const getCurrencies = (data: addWallet.IGetListCurrencyRequestParams) => {
    return Fetch.post<{listModels: addWallet.ICurrency[]}>('/wallet/select-list-currency', data);
};

export const addWallet = (data: addWallet.IAddWalletRequestParams) => {
    return Fetch.post('/wallet/create', data);
};
