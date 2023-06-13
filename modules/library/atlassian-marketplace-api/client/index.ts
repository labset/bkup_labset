import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const client = (): AxiosInstance => {
    return axios.create({
        baseURL: 'https://marketplace.atlassian.com'
    });
};
