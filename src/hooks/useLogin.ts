import Web3 from "web3";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import {
  authenticateUserService,
  signUserWalletService,
} from "../services/authentication";
import { getUserService } from "../services/user";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const login = async () => {
    setLoading(true);
    try {
      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const wallet_address = Web3.utils.toChecksumAddress(accounts[0]);
        const { signature } = await signUserWalletService({ wallet_address });
        const { token } = await authenticateUserService({
          wallet_address,
          signature,
        });
        localStorage.setItem(
          "metadit",
          JSON.stringify({
            token,
            wallet_address,
          })
        );
        const userData = await getUserService();
        localStorage.setItem(
          "metadit",
          JSON.stringify({
            token,
            ...userData,
          })
        );
        window.location.replace("/browse?tab=top");
      }
    } catch (error: any) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    loading,
    login,
    logout,
  };
};
