import Web3 from "web3";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const login = async () => {
    setLoading(true);
    try {
      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = Web3.utils.toChecksumAddress(accounts[0]);
        setAddress(account);
        window.location.replace("/browse");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logout = () => {
    setAddress("");
  };

  return {
    loading,
    address,
    login,
    logout,
  };
};
