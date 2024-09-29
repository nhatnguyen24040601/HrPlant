declare namespace login {
    interface IState {
        access_token: string;
        hideIntro: boolean;
    }

    interface ILoginRequestParams {
        Email?: string;
        Password: string;
        type: import('utils/enum').TypeLogin;
        Phone?: string;
    }

    interface ILoginResponse {
        token: string;
    }

    interface LoginActionPayload {
        data: ILoginRequestParams;
        onSuccess: () => void;
        onFail: (msg: string) => void;
    }
}
