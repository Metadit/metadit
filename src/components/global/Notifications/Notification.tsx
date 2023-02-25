import React from "react";
import moment from "moment";
import { IUserNotifications } from "../../../types/user";
import Link from "next/link";

interface Props {
    data: IUserNotifications;
    closeMenu: () => void;
}

const Notification = ({ data, closeMenu }: Props) => {
    const commentNotification = () => {
        const userWalletAddress = data.message.split(" ")[0];
        return (
            <p className="text-white">
                <Link
                    onClick={closeMenu}
                    href={`/profile/${data.user_id}`}
                    className="text-primary transition-all duration-200 hover:opacity-80"
                >
                    {userWalletAddress}
                </Link>{" "}
                commented on your
                <Link
                    onClick={closeMenu}
                    className="text-primary transition-all duration-200 hover:opacity-80"
                    href={`/post/${data.thread_id}`}
                >
                    {" "}
                    thread
                </Link>
            </p>
        );
    };

    return (
        <div className="bg-darkContent p-2 text-left rounded-md border border-zinc-800">
            <div className="flex gap-2 items-center">
                <div className={`${data.read ? "notifRead" : "notifCircle"}`} />
                <p className="text-content font-bold text-[12px] mb-0.5">
                    {moment(data.created_at).format("LLL")}
                </p>
            </div>
            {data.type === "comment" && commentNotification()}
        </div>
    );
};

export default Notification;
