import Fetch from 'service/api-request';

export const updateFirstLogin = (data: firstInfor.IUpdateFirstLoginRequestParams) => {
    return Fetch.post('/user/update-address', data);
};
