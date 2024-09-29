import Fetch from 'service/api-request';

export const login = (data: login.ILoginRequestParams) => {
    return Fetch.post<login.ILoginResponse>('/user/login', data);
};
