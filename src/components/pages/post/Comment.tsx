import React, { Dispatch, memo, Ref } from "react";
import Avatar from "react-avatar";
import moment from "moment";
import Link from "next/link";
import { IComment, ICommentReply } from "../../../services/threads/types";
import CommentActions from "./CommentActions";
import CommentReply from "./CommentReply";
import Image from "next/image";

interface Props {
    comment: IComment;
    setComments: Dispatch<React.SetStateAction<IComment[] | undefined>>;
    comments: IComment[] | undefined;
    threadCreator: number | undefined;
    lastElement?: Ref<HTMLDivElement>;
}

const Comment = memo(
    ({ comment, setComments, comments, threadCreator, lastElement }: Props) => {
        return (
            <div ref={lastElement} className="w-full">
                <div className="w-full flex flex-wrap gap-2">
                    <div className="w-full flex flex-wrap items-center flex-col">
                        <div className="w-full flex gap-2 items-center">
                            {comment.image_url ? (
                                <Image
                                    className="rounded-full w-[40px] h-[40px]"
                                    width={40}
                                    height={40}
                                    src={
                                        (comment.image_url +
                                            `?${Date.now()}`) as string
                                    }
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
                                        {moment(
                                            comment.datepublished
                                        ).fromNow()}
                                    </p>
                                </div>
                                <p className="text-white text-[14px] mt-1 w-full text-left">
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                        <div className="justify-start mt-4 w-full flex gap-4 items-center">
                            <CommentActions
                                threadCreator={threadCreator}
                                setComments={setComments}
                                comments={comments}
                                comment={comment}
                            />
                        </div>
                        <div className="mt-7 mr-auto ml-8 w-full">
                            {comment.replies.map((reply: ICommentReply) => {
                                return (
                                    <CommentReply
                                        key={reply.id}
                                        parentComment={comment}
                                        setComments={setComments}
                                        threadCreator={threadCreator}
                                        comments={comments}
                                        comment={reply}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

Comment.displayName = "Comment";

export default Comment;
