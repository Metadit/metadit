import React, { ChangeEvent, useRef, useState } from "react";
import UserInfo from "./UserInfo";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faCopy,
    faUsers,
    faWallet,
    faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import Button from "../../global/Button";
import Head from "next/head";
import Loading from "../../global/Loading";
import toast from "react-hot-toast";
import moment from "moment";
import { IUserProfile } from "../../../services/profile/types";
import { useUser } from "../../../contexts/User";
import { useMutation, useQueryClient } from "react-query";
import {
    followUserService,
    unfollowUserService,
} from "../../../services/profile";
import { useModal } from "../../../contexts/Modal";
import { useModalValues } from "../../../contexts/ModalValues";

interface Props {
    className?: string;
    profileLoading: boolean;
    isFetching: boolean;
    data: IUserProfile | undefined;
}

const User = ({ className, data, profileLoading, isFetching }: Props) => {
    const { user } = useUser();
    const fileRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const { setActiveModal } = useModal();
    const { setModalValues } = useModalValues();
    const [userImageFile, setUserImageFile] = useState<{
        file: File | undefined;
        imageUrl: string;
    }>({
        file: undefined,
        imageUrl: "",
    });
    const copyHandler = () => {
        if (data?.wallet_address) {
            navigator.clipboard.writeText(data.wallet_address);
        }
        toast.success("Wallet address copied");
    };

    const fileInputHandler = () => {
        fileRef?.current?.click();
    };

    const readFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = e => {
            if (e.target?.result) {
                setUserImageFile({
                    ...userImageFile,
                    imageUrl: e.target.result.toString(),
                });
            }
        };
        if (file) reader.readAsDataURL(file);
    };

    const fileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUserImageFile({ ...userImageFile, file: e.target.files[0] });
            readFile(e.target.files[0]);
        }
    };

    const { mutate: followHandler, isLoading } = useMutation(
        async () => {
            if (!data?.did_user_follow) {
                await followUserService(data?.id as number, user?.id as number);
            } else {
                await unfollowUserService(
                    data?.id as number,
                    user?.id as number
                );
            }
        },
        {
            onSuccess: () => {
                queryClient.setQueryData("userProfile", (oldData: any) => {
                    return {
                        ...oldData,
                        did_user_follow: !oldData.did_user_follow,
                        follower_count:
                            oldData.follower_count +
                            (oldData.did_user_follow ? -1 : 1),
                    };
                });
            },
            onError: () => {
                if (!user) {
                    setModalValues({ userid: data?.id });
                    setActiveModal("FOLLOW_USER_MODAL");
                }
            },
        }
    );

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
                        <div className="relative w-[100px] h-[100px] mb-7 mx-auto">
                            {userImageFile.imageUrl ? (
                                <div
                                    style={{
                                        backgroundImage: `url(${userImageFile.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                    className="w-[100px] h-[100px] rounded-full"
                                />
                            ) : (
                                <Avatar
                                    className="mr-2 align-top mb-5"
                                    name={user?.wallet_address.substring(0, 2)}
                                    color="black"
                                    textSizeRatio={5}
                                    size="100"
                                    round={true}
                                />
                            )}
                            {user?.id === data?.id && (
                                <>
                                    <div
                                        className="bg-green-800 border-green-600 border
                            w-[30px] h-[30px] rounded-full absolute
                            flex items-center justify-center right-0 bottom-0
                            cursor-pointer transition-all duration-200 hover:brightness-125"
                                        onClick={fileInputHandler}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPencil}
                                            color="white"
                                            className="text-[12px]"
                                        />
                                    </div>
                                    <input
                                        onChange={fileOnChange}
                                        ref={fileRef}
                                        className="hidden"
                                        type="file"
                                    />
                                </>
                            )}
                        </div>
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
                        <UserInfo
                            icon={faUsers}
                            info={`${data?.follower_count} followers`}
                            name="Followers"
                        />
                        {user?.wallet_address === data?.wallet_address ? (
                            ""
                        ) : (
                            <Button
                                onClick={followHandler}
                                loading={isLoading}
                                normal={false}
                                className="mt-5 h-[35px] bg-primaryDark border border-primary w-[80%] mx-auto"
                            >
                                {data?.did_user_follow
                                    ? "Unfollow"
                                    : "+ Follow"}
                            </Button>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default User;
