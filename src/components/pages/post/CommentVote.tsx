import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useThread } from "../../../hooks/useThread";
import { IComment, ICommentReply } from "../../../services/threads/types";
import Button from "../../global/Button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import foam from "../../../lottieJsons/confetti.json";
import { useUser } from "../../../contexts/User";

interface Props {
    count: number;
    comment?: IComment;
    commentId?: number;
    commentReply?: ICommentReply;
}

const CommentVote = ({ count, comment, commentReply, commentId }: Props) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const { commentMutate, setCommentPlayAnimation, commentPlayAnimation } =
        useThread();
    const { user } = useUser();
    const voteHandler = (
        direction: "up" | "down",
        type: "comment" | "reply"
    ) => {
        commentMutate.commentVoteMutate({
            type: type,
            direction: direction,
            comment: {
                [type === "comment" ? "commentid" : "replyid"]: comment
                    ? comment.id
                    : commentReply?.id,
                userid: user?.id,
                threadid:
                    type === "comment"
                        ? comment?.threadid
                        : commentReply?.threadid,
                currentUserVote:
                    type === "comment"
                        ? comment?.did_user_vote
                        : commentReply?.did_user_vote,
                vote: direction === "up" ? 1 : -1,
            },
            commentId: commentId,
        });
        setCommentPlayAnimation(true);
    };
    return (
        <div className="flex gap-2 relative z-10">
            {commentPlayAnimation &&
                (comment?.did_user_vote === 1 ||
                    commentReply?.did_user_vote === 1) && (
                    <div className="absolute w-[150px] h-[150px] top-[-80px] left-[-60px] z-[1]">
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={foam}
                            onLoopComplete={() =>
                                setCommentPlayAnimation(false)
                            }
                            height={150}
                            width={150}
                        />
                    </div>
                )}
            {/* commentOnVote("up", onVoteUpdate, comment)*/}
            <Button
                normal={false}
                disabled={commentMutate.commentVoteLoading}
                onClick={() =>
                    comment
                        ? voteHandler("up", "comment")
                        : commentReply && voteHandler("up", "reply")
                }
                className={`${
                    comment?.did_user_vote === 1 ||
                    commentReply?.did_user_vote === 1
                        ? "bg-primaryDark border border-primary"
                        : "bg-contentBg border border-zinc-700"
                }
                relative z-10
            h-[30px] flex px-0 w-[35px] items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primaryDark hover:border-primary cursor-pointer`}
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
                disabled={commentMutate.commentVoteLoading}
                onClick={() =>
                    comment
                        ? voteHandler("down", "comment")
                        : commentReply && voteHandler("down", "reply")
                }
                className={`${
                    comment?.did_user_vote === -1 ||
                    commentReply?.did_user_vote === -1
                        ? "bg-primaryDark border border-primary"
                        : "bg-contentBg border border-zinc-700"
                } flex
            text-white w-[35px] px-0 h-[30px] items-center justify-center rounded-md
            transition-all duration-200 hover:bg-primaryDark hover:border-primary cursor-pointer text-[12px]`}
            >
                <FontAwesomeIcon icon={faArrowDown} />
            </Button>
        </div>
    );
};

export default CommentVote;
