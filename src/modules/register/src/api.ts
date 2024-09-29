import Fetch from 'service/api-request';

export const getCountries = (data: register.IGetListCountryRequestParams) => {
    return Fetch.post<{listModels: register.ICountry[]}>('/user/select-list-country', data);
};

export const resendOTP = (data: register.IResendOTPRequestParams) => {
    return Fetch.post('/user/resend-otp', data);
};

export const verifyOTP = (data: register.IVerifyOTPRequestParams) => {
    return Fetch.post('/user/verify-otp', data);
};

export const register = (data: register.IRegisterRequestParams) => {
    return Fetch.post('/user/register', data);
};


export const registerValidate = (data: register.IRegisterValidateRequestParams) => {
    return Fetch.post('/user/register-validate', data)
}
