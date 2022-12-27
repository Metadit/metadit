import { getRequest } from "../requests";

interface ISign {
  address: string;
}
export const signUserWallet = async (params: ISign) => {
  return await getRequest("auth/sign", {
    params,
  });
};

interface IAuthenticate {
  address: string;
  signature: string;
}
export const authenticateUser = async (params: IAuthenticate) => {
  return await getRequest("auth/authenticate", {
    params,
  });
};
