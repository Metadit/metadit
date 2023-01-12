import React from "react";
import Avatar from "react-avatar";
import Link from "next/link";
import moment from "moment/moment";

const CommentReply = () => {
    const comment = {
        comment: "comment",
        datepublished: "datepublished",
    };
    return (
        <div className="flex w-full">
            <div className="flex flex-wrap gap-2">
                <Avatar
                    className="mr-2 align-top"
                    name="Jager32"
                    size="40"
                    round={true}
                />
                <div className="flex flex-wrap items-center flex-col">
                    <div className="flex w-full gap-2 items-center">
                        <Link href={""}>
                            <h2
                                className="text-[15px] text-primary font-bold transition-all
              duration-200 hover:opacity-70"
                            >
                                wallet address
                            </h2>
                        </Link>
                        <p className="text-content text-sm">
                            {moment(comment.datepublished).fromNow()}
                        </p>
                    </div>
                    <p className="text-white text-[14px] mt-1 w-full text-left">
                        {comment.comment}
                    </p>
                    <div className="justify-start mt-4 w-full flex gap-4 items-center"></div>
                </div>
            </div>
        </div>
    );
};

export default CommentReply;
