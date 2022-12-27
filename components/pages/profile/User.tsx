import React from "react";
import UserInfo from "./UserInfo";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faWallet,
  faClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import Button from "../../global/Button";
import Head from "next/head";

interface Props {
  className?: string;
}

const User = ({ className }: Props) => {
  return (
    <>
      <Head>
        <title>Jager32 profile</title>
      </Head>
      <div
        className={`rounded-lg w-full bg-darkContent 
      border border-zinc-800 py-8 basis-4/12 
      text-center grow
      ${className}`}
      >
        <Avatar
          className="mr-2 align-top mb-5"
          name="Jager32"
          color="black"
          textSizeRatio={2}
          size="100"
          round={true}
        />
        <UserInfo
          name="Wallet"
          icon={faWallet}
          info="3J98t1WpEZ73CNmQviecrnyiW34a"
        >
          <Tippy content="Copy">
            <div
              className="bg-contentBg border border-zinc-800 p-1
        flex rounded-sm justify-center items-center transition-all duration-200
        hover:duration-200 hover:brightness-125 cursor-pointer"
            >
              <FontAwesomeIcon
                className="text-white text-[11px]"
                icon={faCopy}
              />
            </div>
          </Tippy>
        </UserInfo>
        <UserInfo
          name="Date registered"
          icon={faClock}
          info="Saturday 22nd 2022 5:43PM"
        />
        <UserInfo icon={faUsers} info="343 followers" name="Followers" />
        <Button normal={false} className="mt-5 bg-primary w-[80%] mx-auto">
          + Follow
        </Button>
      </div>
    </>
  );
};

export default User;
