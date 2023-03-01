import React, { Dispatch, SetStateAction } from "react";
import Avatar from "react-avatar";
import Link from "next/link";
import moment from "moment/moment";
import CommentReplyActions from "./CommentReplyActions";
import { IComment, ICommentReply } from "../../../services/threads/types";
import Image from "next/image";

interface Props {
    comment: ICommentReply;
    comments: IComment[] | undefined;
    setComments: Dispatch<SetStateAction<IComment[] | undefined>>;
    parentComment: IComment;
    threadCreator: number | undefined;
}

const CommentReply = ({
    comment,
    comments,
    parentComment,
    setComments,
    threadCreator,
}: Props) => {
    return (
        <div id={String(comment.id)} className="flex w-full mb-8">
            <div className="flex flex-wrap gap-2">
                {comment.image_url ? (
                    <Image
                        className="rounded-full w-[40px] h-[40px]"
                        width={40}
                        height={40}
                        src={(comment.image_url + `?${Date.now()}`) as string}
                        alt="user"
                    />
                ) : (
                    <Avatar
                        className="mr-2"
                        name={comment.wallet_address}
                        size="40"
                        round={true}
                    />
                )}
                <div className="flex flex-wrap items-center flex-col">
                    <div className="flex w-full gap-2 items-center">
                        <Link href={`/profile/${comment.userid}`}>
                            <h2
                                className="text-[15px] text-primary font-bold transition-all
              duration-200 hover:opacity-70"
                            >
                                {comment.wallet_address.substring(0, 10) +
                                    "..."}
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
                <div className="justify-start mt-3 w-full flex gap-4 items-center">
                    <CommentReplyActions
                        comment={comment}
                        parentComment={parentComment}
                        threadCreator={threadCreator}
                        hideReply={true}
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommentReply;
