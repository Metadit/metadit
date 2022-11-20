import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const OtherWallets = () => {
  return (
    <div
      className="bg-contentBg fa-border border-zinc-700 w-full rounded-lg flex
        items-center justify-between h-[55px] gap-2 px-5 transition-all duration-300
        hover:bg-zinc-800 cursor-pointer"
    >
      <FontAwesomeIcon icon={faWallet} size="lg" color="#fff" />
      <p className="text-white text-[12px] md:text-[15px]">
        Login with <b>other wallets</b>
      </p>
    </div>
  );
};

export default OtherWallets;
