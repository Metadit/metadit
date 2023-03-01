import axios from "axios";
import jwt_decode from "jwt-decode";
import { refreshTokensService } from "../services/authentication";

export const useAuthToken = async () => {
    //if token is going to expire in 5 minutes, refresh it
    const userData = JSON.parse(localStorage.getItem("metadit") || "{}");
    if (userData.token) {
        let newToken;
        const oldToken = userData.token;
        const decodedToken: {exp: number} = jwt_decode(oldToken);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime + 300) {
            try {
               const {token} =  await refreshTokensService(userData.wallet_address);
               newToken = token;
               localStorage.setItem("metadit", JSON.stringify({
                ...userData,
                token: newToken,
               }));
            } catch (error) {
                console.log(error);
            }
    } else {
        //if token is not going to expire in 5 minutes, just return
        return;
    }
}
};
