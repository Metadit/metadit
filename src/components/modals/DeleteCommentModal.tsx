import React from "react";
import Modal from "../global/Modal";
import { deleteCommentService } from "../../services/threads";
import { useModalValues } from "../../contexts/ModalValues";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/Modal";
import { useMutation, useQueryClient } from "react-query";

const DeleteCommentModal = () => {
    const { setActiveModal } = useModal();
    const { modalValues } = useModalValues();
    const queryClient = useQueryClient();

    const { mutate: deleteComment, isLoading: deleteLoading } = useMutation(
        async () => {
            await deleteCommentService(
                modalValues.commentId,
                !!modalValues.isReply
            );
        },
        {
            onSuccess: async () => {
                setActiveModal("");
                toast.success("Comment deleted successfully");
                await queryClient.invalidateQueries("threadComments");
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
                Are you sure you want to remove your comment?
            </p>
        </Modal>
    );
};

export default DeleteCommentModal;
