import Web3 from "web3";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";

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

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        localStorage.setItem("metadit", JSON.stringify(account));
        setUser({ address: account });
        window.location.replace("/browse");
      }
    } catch (error) {
      console.log(error);
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
