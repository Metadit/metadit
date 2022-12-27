import { getRequest } from "../requests";

interface ISign {
  wallet_address: string;
}
export const signUserWallet = async (params: ISign) => {
  return await getRequest("auth/sign", {
    params,
  });
};

interface IAuthenticate {
  wallet_address: string;
  signature: string;
}
export const authenticateUser = async (params: IAuthenticate) => {
  return await getRequest("auth/authenticate", {
    params,
  });
};
