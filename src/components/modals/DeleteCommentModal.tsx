import React from "react";
import Modal from "../global/Modal";
import { deleteCommentService } from "../../services/threads";
import { useModalValues } from "../../contexts/ModalValues";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/Modal";
import { useMutation, useQueryClient } from "react-query";
import { IComment, ICommentReply } from "../../services/threads/types";

const DeleteCommentModal = () => {
    const { setActiveModal } = useModal();
    const { modalValues } = useModalValues();
    const queryClient = useQueryClient();
    const commentsData: IComment[] | undefined =
        queryClient.getQueryData("threadComments");
    const getRepliesCount = commentsData?.filter((comment: IComment) => {
        return comment.id === modalValues.commentId;
    });

    const { mutate: deleteComment, isLoading: deleteLoading } = useMutation(
        async () => {
            await deleteCommentService(
                modalValues.commentReplyId || modalValues.commentId,
                !!modalValues.isReply
            );
        },
        {
            onSuccess: () => {
                setActiveModal("");
                toast.success("Comment deleted successfully");
                queryClient.setQueryData("thread", (prev: any) => {
                    if (getRepliesCount) {
                        return {
                            ...prev,
                            comment_count: modalValues.isReply
                                ? prev.comment_count - 1
                                : !modalValues.isReply &&
                                  prev.comment_count -
                                      (getRepliesCount[0].replies.length > 0
                                          ? getRepliesCount[0].replies.length +
                                            1
                                          : 1),
                        };
                    }
                });
                queryClient.setQueryData<IComment[] | undefined>(
                    "threadComments",
                    prev => {
                        if (!modalValues.isReply) {
                            return prev?.filter(
                                (comment: IComment) =>
                                    comment.id !== modalValues.commentId
                            );
                        } else {
                            return prev?.map((comment: IComment) => {
                                if (comment.id === modalValues.commentId) {
                                    return {
                                        ...comment,
                                        replies: comment.replies.filter(
                                            (reply: ICommentReply) =>
                                                reply.id !==
                                                modalValues.commentReplyId
                                        ),
                                    };
                                } else {
                                    return comment;
                                }
                            });
                        }
                    }
                );
            },
            onError: () => {
                toast.error("Error deleting comment");
            },
        }
    );

    return (
        <Modal
            submitHandler={deleteComment}
            buttonLoading={deleteLoading}
            title="Delete comment"
        >
            <p className="text-content text-center text-[14px] mt-2">
                Are you sure you want to remove this comment?
            </p>
        </Modal>
    );
};

export default DeleteCommentModal;
