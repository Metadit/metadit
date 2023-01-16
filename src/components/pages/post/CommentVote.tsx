import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useThread } from "../../../hooks/useThread";
import { IComment, ICommentReply } from "../../../services/threads/types";

interface Props {
    count: number;
    onVoteUpdate: (vote: number, commentId: number) => void;
    comment?: IComment;
    commentReply?: ICommentReply;
}

const CommentVote = ({ count, onVoteUpdate, comment, commentReply }: Props) => {
    const { commentOnVote, replyOnVote } = useThread();
    return (
        <div className="flex gap-2">
            <div
                onClick={() =>
                    comment
                        ? commentOnVote("up", onVoteUpdate, comment)
                        : commentReply &&
                          replyOnVote("up", onVoteUpdate, commentReply)
                }
                className={`${
                    comment?.did_user_vote === 1 ||
                    commentReply?.did_user_vote === 1
                        ? "bg-primary border border-transparent"
                        : "bg-contentBg"
                } w-[35px] border border-zinc-700
            h-[30px] flex items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
            >
                <FontAwesomeIcon
                    className="text-white text-[12px]"
                    icon={faArrowUp}
                />
            </div>
            <div
                className="bg-contentBg w-[35px] border border-zinc-700
      h-[30px] flex items-center justify-center rounded-md"
            >
                <p className="text-white text-[12px]">{count}</p>
            </div>
            <div
                onClick={() =>
                    comment
                        ? commentOnVote("down", onVoteUpdate, comment)
                        : commentReply &&
                          replyOnVote("down", onVoteUpdate, commentReply)
                }
                className={`${
                    comment?.did_user_vote === -1 ||
                    commentReply?.did_user_vote === -1
                        ? "bg-primary border border-transparent"
                        : "bg-contentBg"
                } flex border border-zinc-700
            text-white w-[35px] h-[30px] items-center justify-center rounded-md
            transition-all duration-200 hover:bg-primary
            hover:border-transparent cursor-pointer text-[12px]`}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </div>
        </div>
    );
};

export default CommentVote;
