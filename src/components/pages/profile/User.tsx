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
import Loading from "../../global/Loading";
import toast from "react-hot-toast";
import moment from "moment";
import { IUserProfile } from "../../../services/profile";

interface Props {
  className?: string;
  profileLoading: boolean;
  isFetching: boolean;
  data: IUserProfile | undefined;
}

const User = ({ className, data, profileLoading, isFetching }: Props) => {
  const copyHandler = () => {
    if (data?.wallet_address) {
      navigator.clipboard.writeText(data.wallet_address);
    }
    toast.success("Wallet address copied");
  };
  return (
    <>
      <Head>
        <title>{`${
          !data ? "User" : data?.wallet_address.substring(0, 10)
        } profile`}</title>
      </Head>
      <div
        className={`rounded-lg w-full bg-darkContent 
      border border-zinc-800 py-8 basis-4/12 
      text-center grow relative
      ${className}`}
      >
        {profileLoading || isFetching ? (
          <Loading size={30} />
        ) : (
          <>
            <Avatar
              className="mr-2 align-top mb-5"
              name="Jager32"
              color="black"
              textSizeRatio={2}
              size="100"
              round={true}
            />
            <UserInfo
              onClick={copyHandler}
              name="Wallet"
              icon={faWallet}
              info={data?.wallet_address}
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
              info={moment(data?.date_registered).format("LL")}
            />
            <UserInfo icon={faUsers} info="343 followers" name="Followers" />
            <Button normal={false} className="mt-5 bg-primary w-[80%] mx-auto">
              + Follow
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default User;
