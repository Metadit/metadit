import React, { useState } from "react";
import Modal from "../global/Modal";
import { deleteThreadService } from "../../services/threads";
import { useModalValues } from "../../contexts/ModalValues";
import { toast } from "react-hot-toast/headless";
import { useRouter } from "next/navigation";
import { useModal } from "../../contexts/Modal";
import { useQueryClient } from "react-query";
import { supabase } from "../../supabase";

const DeleteThreadModal = () => {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const { modalValues } = useModalValues();
    const { threadId, threadContent } = modalValues;
    const { setActiveModal } = useModal();
    const queryClient = useQueryClient();
    const router = useRouter();

    const checkThreadForImages = async () => {
        const getImageUrlFromContent = threadContent.match(/<img src="(.+?)"/g);
        if (!getImageUrlFromContent) {
            return;
        }
        const fileNames = getImageUrlFromContent?.map((url: string) => {
            return url.split("/").pop()?.replace("\"", "");
        });
        if (fileNames.length > 0) {
            const { error } = await supabase.storage
                .from("threads")
                .remove(fileNames);
            if (error) {
                toast.error("Something went wrong");
            }
        }
    };

    const deleteHandler = async () => {
        try {
            setDeleteLoading(true);
            await checkThreadForImages();
            await deleteThreadService(threadId);
            await queryClient.invalidateQueries("threads");
            setActiveModal("");
            router.push("/browse");
            toast.success("Thread deleted");
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setDeleteLoading(false);
        }
    };
    return (
        <Modal
            buttonLoading={deleteLoading}
            submitHandler={deleteHandler}
            title="Delete thread"
        >
            <p className="text-content text-center text-[14px] mt-2">
                Are you sure you want to remove your thread?
            </p>
        </Modal>
    );
};

export default DeleteThreadModal;
