import React from "react";
import moment from "moment";

const Notification = () => {
    return (
        <div className="bg-darkContent p-2 text-left rounded-md border border-zinc-800">
            <p className="text-content font-bold text-[12px] mb-0.5">
                {moment().format("LL")}
            </p>
            <p className="text-white">User replied to your thread</p>
        </div>
    );
};

export default Notification;
