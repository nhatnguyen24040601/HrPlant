import Fetch from 'service/api-request';

export const getProfile = () => {
    return Fetch.get<profile.IProfile>('/user/profile');
};
