import React from "react";
import Avatar from "react-avatar";
import moment from "moment";
import Link from "next/link";
import { IComment } from "../../../services/threads/types";
import CommentActions from "./CommentActions";
import CommentReply from "./CommentReply";

interface Props {
    comment: IComment;
    setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
    comments: IComment[] | undefined;
}

const Comment = ({ comment, setComments, comments }: Props) => {
    return (
        <div className="w-full">
            <div className="w-full flex flex-wrap gap-2">
                <div className="w-full flex flex-wrap items-center flex-col">
                    <div className="w-full flex gap-2 items-center">
                        <Avatar
                            className="mr-1 align-top items-center"
                            name="Jager32"
                            size="40"
                            round={true}
                        />
                        <div>
                            <div className="flex gap-3 items-center">
                                <Link href={`/profile/${comment.userid}`}>
                                    <h2
                                        className="text-[15px] text-primary font-bold transition-all
              duration-200 hover:opacity-70"
                                    >
                                        {comment.wallet_address.substring(
                                            0,
                                            10
                                        ) + "..."}
                                    </h2>
                                </Link>
                                <p className="text-content text-sm">
                                    {moment(comment.datepublished).fromNow()}
                                </p>
                            </div>
                            <p className="text-white text-[14px] mt-1 w-full text-left">
                                {comment.comment}
                            </p>
                        </div>
                    </div>
                    <div className="justify-start mt-4 w-full flex gap-4 items-center">
                        <CommentActions
                            setComments={setComments}
                            comments={comments}
                            comment={comment}
                        />
                    </div>
                    <div className="mt-7 mr-auto ml-8 w-full">
                        <CommentReply
                            setComments={setComments}
                            comments={comments}
                            comment={comment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
