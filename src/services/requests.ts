import axios from "axios";
import { USER_TOKEN_KEY } from "../constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getRequest = async (path: string, params?: {}): Promise<any> => {
    const { data } = await axios.get(`${API_URL}/${path}`, {
        params: {
            ...params,
        },
    });
    return data;
};

export const getAuthenticatedRequest = async (path: string, params?: {}) => {
    const { token } = JSON.parse(
        localStorage.getItem(USER_TOKEN_KEY) as string
    );
    const { data } = await axios.get(`${API_URL}/${path}`, {
        headers: {
            Authorization: token,
        },
        params: {
            ...params,
        },
    });
    return data;
};

export const postAuthenticatedRequest = async (path: string, body: {}) => {
    const { token } = JSON.parse(
        localStorage.getItem(USER_TOKEN_KEY) as string
    );
    const { data } = await axios.post(`${API_URL}/${path}`, body, {
        headers: {
            Authorization: token,
        },
    });
    return data;
};

export const putAuthenticatedRequest = async (path: string, body: {}) => {
    const { token } = JSON.parse(
        localStorage.getItem(USER_TOKEN_KEY) as string
    );
    const { data } = await axios.put(`${API_URL}/${path}`, body, {
        headers: {
            Authorization: token,
        },
    });
    return data;
};

export const deleteAuthenticatedRequest = async (path: string, params: {}) => {
    const { token } = JSON.parse(
        localStorage.getItem(USER_TOKEN_KEY) as string
    );
    const { data } = await axios.delete(`${API_URL}/${path}`, {
        headers: {
            Authorization: token,
        },
        params: {
            ...params,
        },
    });
    return data;
};
