import React from "react";
import Avatar from "react-avatar";
import CommentVote from "./CommentVote";
import moment from "moment";
import Link from "next/link";
import voteCountUpdater from "../../../helpers/vote";
import { IComment } from "../../../services/threads/types";
import CommentActions from "./CommentActions";
import CommentReply from "./CommentReply";

interface Props {
    comment: IComment;
    setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
    comments: IComment[] | undefined;
}

const Comment = ({ comment, setComments, comments }: Props) => {
    const commentVoteUpdater = (vote: number, commentId: number) => {
        const newComments = comments?.map(comment => {
            if (commentId === comment.id) {
                return {
                    ...comment,
                    vote_count: voteCountUpdater(
                        comment.vote_count,
                        vote,
                        comment.did_user_vote
                    ),
                    did_user_vote: comment.did_user_vote === vote ? 0 : vote,
                };
            }
            return comment;
        });
        setComments(newComments);
    };

    return (
        <>
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
                        <div className="justify-start mt-4 w-full flex gap-4 items-center">
                            <CommentVote
                                comment={comment}
                                onVoteUpdate={(
                                    vote: number,
                                    commentId: number
                                ) => {
                                    commentVoteUpdater(vote, commentId);
                                }}
                                count={comment.vote_count}
                            />
                            <CommentActions comment={comment} />
                        </div>
                        <div className="mt-7">
                            <CommentReply />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;
