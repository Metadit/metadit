import React from "react";
import ReportModal from "../modals/ReportModal";
import DeleteCommentModal from "../modals/DeleteCommentModal";
import { useModal } from "../../contexts/Modal";

const ModalManager = () => {
    const { activeModal } = useModal();
    switch (activeModal) {
        case "ReportModal":
            return <ReportModal />;
        case "DeleteCommentModal":
            return <DeleteCommentModal />;
        default:
            return null;
    }
};

export default ModalManager;
