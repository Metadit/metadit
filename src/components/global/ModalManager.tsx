import React from "react";
import ReportModal from "../modals/ReportModal";
import DeleteCommentModal from "../modals/DeleteCommentModal";
import FollowUserModal from "../modals/FollowUserModal";
import {useModal} from "../../contexts/Modal";
import DeleteThreadModal from "../modals/DeleteThreadModal";

const ModalManager = () => {
    const {activeModal} = useModal();
    switch (activeModal) {
        case "REPORT_MODAL":
            return <ReportModal/>;
        case "DELETE_COMMENT_MODAL":
            return <DeleteCommentModal/>;
        case "DELETE_THREAD_MODAL":
            return <DeleteThreadModal/>;
        case "FOLLOW_USER_MODAL":
            return <FollowUserModal/>;
        default:
            return null;
    }
};

export default ModalManager;
