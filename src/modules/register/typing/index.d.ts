declare namespace register {
    interface IGetListCountryRequestParams {
        keyword: string;
        isEnterprise: boolean;
        pageIndex: number;
        pageSize: number;
    }

    interface ICountry {
        image: string;
        dialingCode: string;
        allowEnterprise: boolean;
        id: number;
        code: string;
        name: string;
    }

    interface IResendOTPRequestParams {
        object: string;
        type: import('utils/enum').TypeOTP;
    }

    interface IVerifyOTPRequestParams {
        object: string;
        type: import('utils/enum').TypeOTP;
        otp: string;
    }

    interface IRegisterRequestParams {
        FirstName: string;
        LastName: string;
        Email: string;
        Phone: string;
        Address: string;
        Country: string;
        City: string;
        State: string;
        Postcode: string;
        Password: string;
        AccountType: import('utils/enum').TypeRegister;
        BusinessName: string;
        BusinessNumber: string;
    }

    interface IRegisterValidateRequestParams {
        Email?: string;
        Phone?: string;
        Type: import('utils/enum').TypeOTP;
    }
}
