import React from "react";
import Button from "../../global/button";
import art from "../../../assets/images/homeart.svg";

const Content = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-wrap justify-between my-[200px]">
      <div className="w-6/12">
        <h2 className="text-[50px] text-white font-light w-full">
          We like Reddit, so we decided to make a{" "}
          <span className="text-primary">Web3</span> version of it.
        </h2>
        <p className="text-[17px] text-zinc-500 my-4">
          Yeah literally, you just login with your wallet of choice, like
          Metamask, and you can immediately start posting. Simple right?{" "}
        </p>
        <Button className="bg-primary mt-5" normal={false}>
          Join now
        </Button>
      </div>
      <img src={art} alt="art" />
    </div>
  );
};

export default Content;