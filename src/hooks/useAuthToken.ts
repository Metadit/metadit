import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {refreshTokensService} from "../services/authentication";

/* A hook that checks the JWT token every 5 minutes
* and refreshes it when expiry is 5 minutes away*/

export const useAuthToken = () => {
    const [jwt, setJwt] = useState<string>("");
    const userData =
        typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("metadit") || "{}");
    useEffect(() => {
        if (!userData.token) return;
        setJwt(userData.token);
        const timer = setInterval(async () => {
            try {
                const decodedToken: {
                    exp: number;
                    iat: number;
                    token: string;
                } = jwt_decode(jwt);
                const expirationTime = decodedToken.exp * 1000;
                if (expirationTime - Date.now() < 10 * 1000) {
                    const {token} = await refreshTokensService(
                        userData.wallet_address
                    );
                    setJwt(token);
                    const updatedUser = {...userData, token: token};
                    localStorage.setItem(
                        "metadit",
                        JSON.stringify(updatedUser)
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }, 5 * 60 * 1000);
        return () => {
            if (!userData.token) return;
            if (timer) clearInterval(timer);
        };
    }, [jwt, userData]);
};
