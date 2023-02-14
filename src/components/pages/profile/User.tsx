import React, { ChangeEvent, useRef, useState } from "react";
import UserInfo from "./UserInfo";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faCopy,
    faPencil,
    faUsers,
    faWallet,
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
import { motion } from "framer-motion";
import { supabase } from "../../../supabase";
import { uploadImageService } from "../../../services/user";
import Image from "next/image";

interface Props {
    className?: string;
    profileLoading: boolean;
    isFetching: boolean;
    data: IUserProfile | undefined;
}

const User = ({ className, data, profileLoading, isFetching }: Props) => {
    const { user, setUser } = useUser();
    const fileRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const [imageUploading, setImageUploading] = useState(false);
    const { setActiveModal } = useModal();
    const { setModalValues } = useModalValues();
    const [userImageFile, setUserImageFile] = useState<{
        file: File | undefined;
        imageUrl: string;
        imageUploaded: boolean;
    }>({
        file: undefined,
        imageUrl: "",
        imageUploaded: false,
    });
    const copyHandler = () => {
        if (data?.wallet_address) {
            navigator.clipboard.writeText(data.wallet_address);
        }
        toast.success("Wallet address copied");
    };

    const fileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                if (e.target?.result) {
                    setUserImageFile({
                        ...userImageFile,
                        file: file,
                        imageUrl: e.target.result.toString(),
                    });
                }
            };
            if (file) reader.readAsDataURL(file);
        }
    };

    const { mutate: followHandler, isLoading } = useMutation(
        async () => {
            if (!data?.did_user_follow) {
                await followUserService(data?.id as number, user?.id as number);
            } else {
                if (user) {
                    await unfollowUserService(data.id, user.id);
                }
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

    const { mutate: uploadImageHandler } = useMutation(
        async (imageUrl: string) => {
            if (user) {
                await uploadImageService(user.id, imageUrl);
            }
        },
        {
            onSuccess: () => {
                queryClient.setQueryData("userProfile", (oldData: any) => {
                    return {
                        ...oldData,
                        image_url: userImageFile.imageUrl,
                    };
                });
                toast.success("Avatar updated successfully");
            },
            onError: () => {
                toast.error("Error uploading image");
            },
        }
    );

    const cancelImageHandler = () => {
        setUserImageFile({
            ...userImageFile,
            file: undefined,
            imageUrl: "",
        });
    };

    const submitImageHandler = async () => {
        if (userImageFile.file) {
            const fileExtension = userImageFile.file.name.split(".").pop();
            const fileName = `${user?.id}.${fileExtension}`;
            const filePath = `${fileName}`;
            try {
                setImageUploading(true);
                await supabase.storage
                    .from("useravatars")
                    .remove([
                        `${user?.id}.png`,
                        `${user?.id}.jpg`,
                        `${user?.id}.jpeg`,
                    ]);
                await supabase.storage
                    .from("useravatars")
                    .upload(filePath, userImageFile.file);
                const { data } = supabase.storage
                    .from("useravatars")
                    .getPublicUrl(filePath);
                await uploadImageHandler(data.publicUrl);
                setUser({ ...user, image_url: data.publicUrl });
                setUserImageFile({ ...userImageFile, imageUploaded: true });
            } catch (e) {
                toast.error("Error uploading image");
                console.log(e);
            } finally {
                setImageUploading(false);
            }
        }
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
                        <div className="relative w-[100px] h-[100px] mb-7 mx-auto">
                            {userImageFile.imageUrl || data?.image_url ? (
                                <Image
                                    className="rounded-full w-[100px] h-[100px]"
                                    width={100}
                                    height={100}
                                    src={
                                        (userImageFile.imageUrl as string) ||
                                        ((data?.image_url +
                                            `?${Date.now()}`) as string)
                                    }
                                    alt="user"
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
                                        onClick={() =>
                                            fileRef?.current?.click()
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faPencil}
                                            color="white"
                                            className="text-[12px]"
                                        />
                                    </div>
                                    <input
                                        key={Date.now()}
                                        onChange={fileOnChange}
                                        accept="image/png, image/jpeg"
                                        ref={fileRef}
                                        className="hidden"
                                        type="file"
                                    />
                                </>
                            )}
                        </div>
                        {userImageFile.imageUrl &&
                            !userImageFile.imageUploaded && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full flex justify-center gap-3 mb-5"
                                >
                                    <Button
                                        onClick={submitImageHandler}
                                        loading={imageUploading}
                                        disabled={imageUploading}
                                        className="bg-blue-800 border-blue-600 border"
                                        normal={false}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        disabled={imageUploading}
                                        onClick={cancelImageHandler}
                                        className="bg-red-800 border-red-600 border"
                                        normal={false}
                                    >
                                        Cancel
                                    </Button>
                                </motion.div>
                            )}
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
