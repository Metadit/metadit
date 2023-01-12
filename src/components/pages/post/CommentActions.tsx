import React, { Dispatch, SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../contexts/Modal";
import { useUser } from "../../../contexts/User";
import { IComment } from "../../../services/threads/types";
import { useModalValues } from "../../../contexts/ModalValues";
import { useInputForm } from "../../../hooks/useInputForm";
import TextAreaBox from "../../global/TextAreaBox";
import CommentVote from "./CommentVote";
import voteCountUpdater from "../../../helpers/vote";
import { motion } from "framer-motion";
import Button from "../../global/Button";

interface Props {
    comment: IComment;
    comments: IComment[] | undefined;
    setComments: Dispatch<SetStateAction<IComment[] | undefined>>;
    hideReply?: boolean;
}

const CommentActions = ({
    comment,
    comments,
    setComments,
    hideReply,
}: Props) => {
    const { setActiveModal } = useModal();
    const { user } = useUser();
    const { setModalValues } = useModalValues();
    const { onChangeHandler, inputValues, setInputValues } = useInputForm({
        replyContent: "",
    });
    const [toggleReply, setToggleReply] = useState(false);
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

    const toggleHandler = (active?: boolean) => {
        setToggleReply(active || false);
        setInputValues({ replyContent: "" });
    };

    return (
        <div className="w-full">
            <div className="w-full flex gap-4 items-center">
                <CommentVote
                    comment={comment}
                    onVoteUpdate={(vote: number, commentId: number) => {
                        commentVoteUpdater(vote, commentId);
                    }}
                    count={comment.vote_count}
                />
                {hideReply ? null : (
                    <p
                        onClick={() => toggleHandler(!toggleReply)}
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
                    onClick={() => {
                        setActiveModal("ReportModal");
                    }}
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
                {comment.userid === user?.id && (
                    <p
                        onClick={() => {
                            setActiveModal("DeleteCommentModal");
                            setModalValues({ commentId: comment.id });
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
                    <div className="flex gap-4 items-center mt-3">
                        <Button
                            disabled={inputValues.replyContent.length === 0}
                            normal={false}
                            className="bg-primary border-transparent"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={() => toggleHandler(false)}
                            normal={true}
                        >
                            Cancel
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CommentActions;
