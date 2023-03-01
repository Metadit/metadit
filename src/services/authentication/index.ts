import { getAuthenticatedRequest, getRequest } from "../requests";

export const signUserWalletService = async (wallet_address: string) => {
    return await getRequest("auth/sign", {
        wallet_address,
    });
};

export const refreshTokensService = async (wallet_address: string) => {
    return await getAuthenticatedRequest("auth/refresh", {
        wallet_address,
 });
};

export const authenticateUserService = async (
    wallet_address: string,
    signature: string
) => {
    return await getRequest("auth/authenticate", {
        wallet_address,
        signature,
    });
};
