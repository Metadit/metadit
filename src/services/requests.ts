import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getRequest = async (path: string, params?: {}) => {
  const { data } = await axios.get(`${API_URL}/${path}`, {
    ...params,
  });
  return data;
};

export const getAuthenticatedRequest = async (path: string, params?: {}) => {
  const { token } = JSON.parse(localStorage.getItem("metadit") as any);
  const { data } = await axios.get(`${API_URL}/${path}`, {
    headers: {
      Authorization: token,
    },
    ...params,
  });
  return data;
};
