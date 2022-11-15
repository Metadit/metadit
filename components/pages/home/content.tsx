import React from "react";
import Button from "../../global/button";
import art from "../../../assets/images/homeart.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const Content = () => {
  return (
    <div
      className="w-full px-10 max-w-[1400px] items-center mx-auto
     flex flex-wrap justify-between gap-10 flex-col-reverse my-[100px] lg:my-[200px] lg:flex-row lg:gap-0"
    >
      <div className="w-full lg:w-6/12">
        <h2 className="text-[30px] text-white font-light w-full lg:text-[40px]">
          We like Reddit, so we decided to make a{" "}
          <span className="text-primary">Web3</span> version of it.
        </h2>
        <p className="text-[17px] text-zinc-500 my-4 w-full">
          Yeah literally, you just login with your wallet of choice, like
          Metamask, and you can immediately start posting. Simple right?{" "}
        </p>
        <Button className="bg-primary mt-5" normal={false}>
          Join now
        </Button>
      </div>
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
        }}
      >
        <Image src={art} alt="illustration" />
      </motion.div>
    </div>
  );
};

export default Content;
