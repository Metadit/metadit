import React from "react";
import ReportModal from "../modals/ReportModal";
import { useModal } from "../../src/contexts/Modal";

const ModalManager = () => {
  const { activeModal } = useModal();
  switch (activeModal) {
    case "ReportModal":
      return <ReportModal />;
    default:
      return null;
  }
};

export default ModalManager;
