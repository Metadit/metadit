import { Dispatch, SetStateAction, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { refreshTokensService } from "../services/authentication";
import { IUserLocalStorage } from "../types/user";
import { USER_TOKEN_KEY } from "../constants";
import { toast } from "react-hot-toast/headless";
import { useUser } from "../contexts/User";

export const useAuthToken = (): string => {
    const REFRESH_INTERVAL = 60 * 1000;
    const { setUser } = useUser();
    const [jwt, setJwt] = useState<string>("");
    const userData =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(USER_TOKEN_KEY) || "{}");

    useEffect(() => {
        if (!userData?.token) return;
        setJwt(userData.token);
        const interval = setInterval(() => {
            refreshTokenIfExpiringSoon(userData, jwt, setJwt).catch(() => {
                toast.error("Error refreshing token");
                setUser(null);
                localStorage.removeItem(USER_TOKEN_KEY);
            });
        }, REFRESH_INTERVAL);
        return () => {
            clearInterval(interval);
        };
    }, [REFRESH_INTERVAL, jwt, setUser, userData]);

    return jwt;
};

async function refreshTokenIfExpiringSoon(
    userData: IUserLocalStorage,
    jwt: string,
    setJwt: Dispatch<SetStateAction<string>>
): Promise<void> {
    const decodedToken: {
        exp: number;
        iat: number;
        token: string;
    } = jwt_decode(jwt);
    const expirationTime = decodedToken.exp * 1000;

    if (expirationTime - Date.now() < 20 * 1000) {
        const { token } = await refreshTokensService(userData.wallet_address);
        setJwt(token);
        const updatedUser = { ...userData, token };
        localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(updatedUser));
    } else {
        return;
    }
}
