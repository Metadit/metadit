import React, { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../contexts/Modal";
import { useUser } from "../../../contexts/User";
import { IComment, ICommentReply } from "../../../services/threads/types";
import { useModalValues } from "../../../contexts/ModalValues";
import { useInputForm } from "../../../hooks/useInputForm";
import TextAreaBox from "../../global/TextAreaBox";
import CommentVote from "./CommentVote";
import voteCountUpdater from "../../../helpers/vote";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import redirectWithError from "../../../helpers/redirectWithError";

interface Props {
    comment: ICommentReply;
    comments: IComment[] | undefined;
    setComments: Dispatch<SetStateAction<IComment[] | undefined>>;
    hideReply?: boolean;
    threadCreator: number | undefined;
}

const CommentReplyActions = ({
    comment,
    comments,
    setComments,
    hideReply,
    threadCreator,
}: Props) => {
    const { setActiveModal } = useModal();
    const { user } = useUser();
    const { setModalValues } = useModalValues();
    const { onChangeHandler, inputValues, setInputValues } = useInputForm({
        replyContent: "",
    });
    const router = useRouter();
    const threadIdParam = router.query.id as string;
    const [toggleReply, setToggleReply] = useState(false);
    const commentVoteUpdater = (vote: number, commentData: ICommentReply) => {
        const newComments = comments?.map(comment => {
            if (commentData.commentid === comment.id) {
                return {
                    ...comment,
                    replies: comment.replies?.map(reply => {
                        if (reply.id === commentData.id) {
                            return {
                                ...reply,
                                vote_count: voteCountUpdater(
                                    reply.vote_count,
                                    vote,
                                    reply.did_user_vote
                                ),
                                did_user_vote:
                                    reply.did_user_vote === vote ? 0 : vote,
                            };
                        }
                        return reply;
                    }),
                };
            }
            return comment;
        });
        setComments(newComments);
    };

    const toggleReportModal = () => {
        if (!user) {
            return redirectWithError(
                "You must be logged in to report a comment",
                `/login/?post=${threadIdParam}`
            );
        }
        setActiveModal("REPORT_MODAL");
        setModalValues({ ...comment, type: "commentReply" });
    };

    const toggleReplyModal = (active?: boolean) => {
        setToggleReply(active || false);
        setInputValues({ replyContent: "" });
    };

    return (
        <div className="w-full">
            <div className="w-full flex gap-4 items-center">
                <CommentVote
                    commentReply={comment}
                    onVoteUpdate={(vote: number, comment: ICommentReply) => {
                        commentVoteUpdater(vote, comment);
                    }}
                    count={comment.vote_count}
                />
                {hideReply ? null : (
                    <p
                        onClick={() => toggleReplyModal(!toggleReply)}
                        className="text-content text-[13px]
            transition-all duration-200 cursor-pointer
             hover:text-primary"
                    >
                        <FontAwesomeIcon
                            className="mr-1 text-[12px]"
                            icon={faReply}
                        />
                        Reply
                    </p>
                )}
                <p
                    onClick={toggleReportModal}
                    className="text-content text-[13px]
            transition-all duration-200 cursor-pointer
             hover:text-primary"
                >
                    <FontAwesomeIcon
                        className="mr-1 text-[12px]"
                        icon={faFlag}
                    />
                    Report
                </p>
                {(comment.userid === user?.id ||
                    threadCreator === user?.id) && (
                    <p
                        onClick={() => {
                            setActiveModal("DELETE_COMMENT_MODAL");
                            setModalValues({
                                commentId: comment.id,
                                isReply: true,
                            });
                        }}
                        className="text-content text-[13px]
            transition-all duration-200 cursor-pointer
             hover:text-primary"
                    >
                        <FontAwesomeIcon
                            className="mr-1 text-[12px]"
                            icon={faTrash}
                        />
                        Delete
                    </p>
                )}
            </div>
            {toggleReply && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                >
                    <TextAreaBox
                        name="replyContent"
                        onChange={onChangeHandler}
                        placeholder="Reply to this comment"
                        value={inputValues.replyContent}
                        className="w-full md:w-[60%] h-[150px] mt-5"
                    />
                </motion.div>
            )}
        </div>
    );
};

export default CommentReplyActions;
