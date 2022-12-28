import Web3 from "web3";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import {
  authenticateUserService,
  signUserWalletService,
} from "../services/authentication";
import { getUserService } from "../services/user";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const walletAuthHandler = async (wallet_address: string) => {
    try {
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
      return token;
    } catch (error) {
      throw new Error("Error signing wallet");
    }
  };
  const authenticationHandler = async (wallet_address: string) => {
    try {
      const token = await walletAuthHandler(wallet_address);
      const userData = await getUserService();
      localStorage.setItem(
        "metadit",
        JSON.stringify({
          token,
          ...userData,
        })
      );
      window.location.replace("/browse?tab=top");
    } catch (e) {
      toast.error("Error authenticating user");
    } finally {
      setLoading(false);
    }
  };
  const login = async () => {
    setLoading(true);
    try {
      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const wallet_address = Web3.utils.toChecksumAddress(accounts[0]);
        await authenticationHandler(wallet_address);
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
