declare namespace addWallet {
    interface ICurrency {
        image: string;
        id: number;
        code: string;
        name: string;
        hasWallet: boolean;
    }

    interface IWallet {
        image: string;
        id: number;
        code: string;
        name: string;
    }

    interface IGetListCurrencyRequestParams {
        keyword: string;
        pageIndex: number;
        pageSize: number;
    }

    interface IAddWalletRequestParams {
        currencyId: number;
    }
}
