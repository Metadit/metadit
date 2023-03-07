import React from "react";
import moment from "moment";
import { IUserNotifications } from "../../../types/user";
import parse from "html-react-parser";

interface Props {
    data: IUserNotifications;
    closeMenu: () => void;
}

const Notification = ({ data, closeMenu }: Props) => {
    return (
        <div className="bg-darkContent p-2 text-left rounded-md border border-zinc-800">
            <div className="flex gap-2 items-center">
                <div className={`${data.read ? "notifRead" : "notifCircle"}`} />
                <p className="text-content font-bold text-[12px] mb-0.5">
                    {moment(data.created_at).format("LLL")}
                </p>
            </div>
            <div onClick={closeMenu}>{parse(data.message)}</div>
        </div>
    );
};

export default Notification;
