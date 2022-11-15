import React from "react";
import logo from "../../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-t-zinc-800">
      <div
        className="py-20 px-10 w-full
       max-w-[1400px] items-center mx-auto"
      >
        <div className="flex justify-between flex-wrap">
          <div>
            <Image src={logo} alt="metadit-logo" />
            <div className="flex gap-4 mt-5">
              <FontAwesomeIcon
                className="text-content text-2xl transition-all duration-200
                 hover:brightness-125 cursor-pointer"
                icon={faGithub}
              />
              <FontAwesomeIcon
                className="text-content text-2xl transition-all duration-200
                 hover:brightness-125 cursor-pointer"
                icon={faDiscord}
              />
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-light">Community</h2>
            <ul>
              <li
                className="text-content text-sm mt-2
                         transition-all duration-200 hover:brightness-125 cursor-pointer"
              >
                Contribute
              </li>
              <li
                className="text-content text-sm mt-2
                         transition-all duration-200 hover:brightness-125 cursor-pointer"
              >
                Discord
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-24">
          <div className="w-full h-[1px] bg-zinc-800" />
          <p className="text-content text-center mt-6 text-sm">
            MetaDit @ 2022
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
