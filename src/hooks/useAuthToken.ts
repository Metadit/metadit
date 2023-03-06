import { useMemo } from "react";
import jwt_decode from "jwt-decode";
import { refreshTokensService } from "../services/authentication";

export const useAuthToken = async () => {
    const userStore =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("metadit") || "{}");
    const userData = useMemo(() => userStore, [userStore]);
    // if token is going to expire in 5 minutes, refresh it
    if (!userData.token) return;
    const oldToken = userData.token;
    const decodedToken: { exp: number } = jwt_decode(oldToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime + 300) {
        try {
            const { token } = await refreshTokensService(
                userData.wallet_address
            );
            localStorage.setItem(
                "metadit",
                JSON.stringify({
                    ...userData,
                    token: token,
                })
            );
        } catch (error) {
            console.log(error);
        }
    }
};
