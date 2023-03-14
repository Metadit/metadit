import { Dispatch, SetStateAction, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { refreshTokensService } from "../services/authentication";
import { IUserLocalStorage } from "../types/user";
import { USER_TOKEN_KEY } from "../constants";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useAuthToken = () => {
    const [jwt, setJwt] = useState<string>("");
    const userData =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem(USER_TOKEN_KEY) || "{}");

    useEffect(() => {
        if (!userData?.token) return;

        setJwt(userData.token);

        const interval = setInterval(() => {
            refreshTokenIfExpiringSoon(userData, jwt, setJwt).catch(error => {
                console.log(error);
            });
        }, REFRESH_INTERVAL);

        return () => {
            clearInterval(interval);
        };
    }, [jwt, userData]);

    return jwt;
};

async function refreshTokenIfExpiringSoon(
    userData: IUserLocalStorage,
    jwt: string,
    setJwt: Dispatch<SetStateAction<string>>
) {
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
    }
}
