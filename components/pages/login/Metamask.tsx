import React from "react";
import Image from "next/image";
import metamask from "../../../assets/images/metamask.png";

const Metamask = () => {
  return (
    <div
      className="bg-primary w-full rounded-lg flex
        items-center justify-between h-[55px] gap-2 px-5 transition-all duration-300
        hover:brightness-110 cursor-pointer"
    >
      <Image width={20} src={metamask} alt="metamask" />
      <p className="text-white text-[12px] md:text-[15px]">
        Login with <b>Metamask</b>
      </p>
    </div>
  );
};

export default Metamask;
