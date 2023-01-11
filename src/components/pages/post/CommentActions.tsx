import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../contexts/Modal";
import { useUser } from "../../../contexts/User";
import { IComment } from "../../../services/threads/types";
import { useModalValues } from "../../../contexts/ModalValues";

interface Props {
    comment: IComment;
}

const CommentActions = ({ comment }: Props) => {
    const { setActiveModal } = useModal();
    const { user } = useUser();
    const { setModalValues } = useModalValues();

    return (
        <>
            <p
                className="text-content text-[13px]
            transition-all duration-200 cursor-pointer
             hover:text-primary"
            >
                <FontAwesomeIcon className="mr-1 text-[12px]" icon={faReply} />
                Reply
            </p>
            <p
                onClick={() => {
                    setActiveModal("ReportModal");
                }}
                className="text-content text-[13px]
            transition-all duration-200 cursor-pointer
             hover:text-primary"
            >
                <FontAwesomeIcon className="mr-1 text-[12px]" icon={faFlag} />
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
        </>
    );
};

export default CommentActions;
