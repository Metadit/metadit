import React, { useState } from "react";
import Modal from "../global/Modal";
import { reportCommentService } from "../../services/threads";
import { useModalValues } from "../../contexts/ModalValues";
import toast from "react-hot-toast";
import { useModal } from "../../contexts/Modal";

interface Option {
    text: string;
    value: string;
}

const ReportModal = () => {
    const [optionSelected, setOptionSelected] = useState<string>("");
    const [reportLoading, setReportLoading] = useState<boolean>(false);
    const { setActiveModal } = useModal();
    const { modalValues } = useModalValues();
    const options: Option[] = [
        { text: "Offensive", value: "offensive" },
        { text: "Spam", value: "spam" },
        { text: "Inappropriate", value: "inappropriate" },
        { text: "Misinformation", value: "misinformation" },
        { text: "Hate", value: "hate" },
        { text: "Impersonation", value: "impersonation" },
        { text: "Harassment", value: "harassment" },
        { text: "Scam", value: "scam" },
    ];
    const selectOption = (optionValue: Option["value"]) => {
        setOptionSelected(
            optionValue.charAt(0).toUpperCase() + optionValue.slice(1)
        );
    };

    const reportSubmitHandler = async () => {
        try {
            setReportLoading(true);
            const { message } = await reportCommentService({
                commentid:
                    modalValues.type === "commentReply"
                        ? modalValues.commentid
                        : modalValues.id,
                replyid:
                    modalValues.type === "commentReply" ? modalValues.id : null,
                reason: optionSelected,
                userid: modalValues.userid,
                threadid: modalValues.threadid,
            });
            toast.success(message);
            setActiveModal(null);
        } catch (error: any) {
            toast.error(error.response.data || "Something went wrong");
        } finally {
            setReportLoading(false);
        }
    };

    return (
        <Modal
            submitHandler={reportSubmitHandler}
            disabledButton={optionSelected === ""}
            title="Report comment"
            buttonLoading={reportLoading}
        >
            <div className="flex w-full my-5 items-center justify-center gap-3 flex-wrap">
                {options.map(option => (
                    <p
                        key={option.value}
                        onClick={() => selectOption(option.value)}
                        className={`${
                            optionSelected === option.text
                                ? "bg-content bg-opacity-10 text-white"
                                : "bg-darkContent text-content hover:text-primary"
                        } flex-grow text-sm text-center transition-all duration-200
                           cursor-pointer
                            p-3 border border-zinc-800 rounded-md`}
                    >
                        {option.text}
                    </p>
                ))}
            </div>
        </Modal>
    );
};

export default ReportModal;
