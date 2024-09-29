import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {logoutAction} from 'modules/login/src/actions';
import Config from 'react-native-config';
import {store} from 'redux/store';

axios.interceptors.request.use((request) => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
});

const getUrl = (url) => {
    return Config.API_URL + '/api' + url;
};

const getConfigWithToken = (access_token: string, config: AxiosRequestConfig = {}): AxiosRequestConfig => {
    let headers = config.headers || {};
    if (access_token) {
        headers = {
            Authorization: `Bearer ${access_token}`,
            ...headers,
        };
    }
    return {
        ...config,
        headers,
    };
};

const handleError = (error: AxiosError<{errors: {title: string; detail: string}[]}>) => {
    if (error.response.status === 401) {
        //logout or refresh token
        store.dispatch(logoutAction());
    }
    return 'Có lỗi xảy ra, hãy thử lại.';
};

class FetchInstance {
    access_token = '';

    get = <ResponseType>(url: string, params?: Object, config?: AxiosRequestConfig) => {
        return new Promise((resolve: (value: ResponseType) => void, reject) => {
            axios
                .get<{
                    status: 'failed' | 'success';
                    data: ResponseType;
                    errors: {message: string}[];
                }>(getUrl(url), {
                    ...getConfigWithToken(this.access_token, {...config, params}),
                })
                .then((res) => {
                    if (res.data.status === 'success') {
                        resolve(res.data.data);
                    } else {
                        reject(res.data.errors?.[0]?.message || 'Có lỗi xảy ra');
                    }
                })
                .catch((e) => {
                    reject(handleError(e));
                });
        });
    };
    post = <ResponseType>(url: string, data?: Object, config?: AxiosRequestConfig) => {
        const fetchUrl = getUrl(url);
        const fetchConfig = getConfigWithToken(this.access_token, {...config});
        return new Promise((resolve: (value: ResponseType) => void, reject) => {
            axios
                .post<{
                    status: 'failed' | 'success';
                    data: ResponseType;
                    errors: {message: string}[];
                }>(fetchUrl, data, fetchConfig)
                .then((res) => {
                    if (res.data.status === 'success') {
                        resolve(res.data.data);
                    } else {
                        reject(res.data.errors?.[0]?.message || 'Có lỗi xảy ra');
                    }
                })
                .catch((e) => {
                    reject(handleError(e));
                });
        });
    };
}

const Fetch = new FetchInstance();

export default Fetch;
