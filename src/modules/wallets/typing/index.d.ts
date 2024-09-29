declare namespace wallet {
    interface IState {
        myWallets: IWallet[];
        idWalletSelected: number;
    }

    interface IGetMyWalletRequestParams {
        keyword: string;
        pageIndex: number;
        pageSize: number;
    }

    interface IGetMyWalletActionPayload {
        data: IGetMyWalletRequestParams;
    }

    interface IWallet {
        image: string;
        id: number;
        code: string;
        name: string;
        balance: number;
        selecting?: boolean;
    }
}
