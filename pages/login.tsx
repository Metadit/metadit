import React from "react";
import Image from "next/image";
import art from "../assets/images/loginart.png";
import Metamask from "../components/pages/login/Metamask";
import OtherWallets from "../components/pages/login/OtherWallets";
import BePart from "../components/pages/login/BePart";
import { motion } from "framer-motion";
import logo from "../assets/images/logo.svg";
import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full px-10 justify-items-center absolute">
      <Link className="mb-12" href="/">
        <Image src={logo} alt="metadit-logo" />
      </Link>
      <div
        className="w-full max-w-[1000px] mx-auto
       flex flex-wrap h-[500px] md:h-[600px] border border-zinc-800 rounded-xl"
      >
        <div className="hidden md:flex flex-[50%] flex justify-center items-center">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
          >
            <Image width={280} src={art} alt="login" />
          </motion.div>
        </div>
        <div className="flex-[50%] bg-contentBg rounded-tr-xl rounded-br-xl">
          <div className="w-[80%] mx-auto flex flex-col items-center justify-center h-full">
            <h1 className="text-[20px] md:text-[30px] text-white text-left w-full mb-5">
              Welcome <b>User</b>,
            </h1>
            <div className="w-full flex flex-wrap gap-5">
              <Metamask />
              <OtherWallets />
            </div>
            <BePart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
