declare namespace transaction {
    interface ICheckReceiveCadaWalletRequestParams {
        object: string;
        type: import('utils/enum').TypeOTP;
        currencyId: number;
    }

    interface IReceiver {
        email: string;
        phone: string;
        fistName: string;
        lastName: string;
        walletId: number;
        accountType: import('utils/enum').TypeRegister;
    }

    interface ISendWalletToWalletRequestParams {
        amount: number;
        amountGBP: number;
        senderWalletId: number;
        receiverWalletId: number;
        notes: string;
    }

    interface IPaymentMethod {
        icon: TNameOfIconSVG;
        name: string;
        desc: string;
        type: TypePaymentMethod;
    }
}
