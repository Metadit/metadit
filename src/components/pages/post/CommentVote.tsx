import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useThread } from "../../../hooks/useThread";
import { IComment, ICommentReply } from "../../../services/threads/types";
import Button from "../../global/Button";

interface Props {
    count: number;
    onVoteUpdate: (vote: number, comment: any) => void;
    comment?: IComment;
    commentReply?: ICommentReply;
}

const CommentVote = ({ count, onVoteUpdate, comment, commentReply }: Props) => {
    const { commentOnVote, replyOnVote, voteLoading } = useThread();
    return (
        <div className="flex gap-2">
            <Button
                normal={false}
                disabled={voteLoading}
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
                } border border-zinc-700
            h-[30px] flex px-0 w-[35px] items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
            >
                <FontAwesomeIcon
                    className="text-white text-[12px]"
                    icon={faArrowUp}
                />
            </Button>
            <div
                className="bg-contentBg w-[35px] border border-zinc-700
      h-[30px] flex items-center justify-center rounded-md"
            >
                <p className="text-white text-[12px]">{count}</p>
            </div>
            <Button
                normal={false}
                disabled={voteLoading}
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
            text-white w-[35px] px-0 h-[30px] items-center justify-center rounded-md
            transition-all duration-200 hover:bg-primary
            hover:border-transparent cursor-pointer text-[12px]`}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </Button>
        </div>
    );
};

export default CommentVote;
