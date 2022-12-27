import Web3 from "web3";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { authenticateUser, signUserWallet } from "../services/authentication";

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
        const { signature } = await signUserWallet({ wallet_address });
        const { token } = await authenticateUser({
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
        setUser({ wallet_address });
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
