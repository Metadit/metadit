import React from "react";
import logo from "../../../public/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-t-zinc-800 mt-20">
      <div
        className="py-20 px-10 w-full
       max-w-[1400px] items-center mx-auto"
      >
        <div className="flex justify-between flex-wrap">
          <div>
            <Image src={logo} alt="metadit-logo" />
            <div className="flex gap-4 mt-5">
              <Link target="_blank" href="https://github.com/Metadit/metadit">
                <FontAwesomeIcon
                  className="text-content text-2xl transition-all duration-200
                 hover:brightness-125 cursor-pointer"
                  icon={faGithub}
                />
              </Link>
              <Link target="_blank" href="https://discord.gg/r6HjT4JD5p">
                <FontAwesomeIcon
                  className="text-content text-2xl transition-all duration-200
                 hover:brightness-125 cursor-pointer"
                  icon={faDiscord}
                />
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-light">Community</h2>
            <ul>
              <Link target="_blank" href="https://github.com/Metadit/metadit">
                <li
                  className="text-content text-sm mt-2
                         transition-all duration-200 hover:brightness-125 cursor-pointer"
                >
                  Contribute
                </li>
              </Link>
              <Link target="_blank" href="https://discord.gg/r6HjT4JD5p">
                <li
                  className="text-content text-sm mt-2
                         transition-all duration-200 hover:brightness-125 cursor-pointer"
                >
                  Discord
                </li>
              </Link>
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
