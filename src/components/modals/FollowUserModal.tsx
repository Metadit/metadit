import React from "react";
import Modal from "../global/Modal";
import {useModalValues} from "../../contexts/ModalValues";
import {useModal} from "../../contexts/Modal";

const FollowUserModal = () => {
    const {modalValues} = useModalValues();
    const {setActiveModal} = useModal();
    const {userid} = modalValues;
    return (
        <Modal
            submitHandler={() => setActiveModal("")}
            buttonLink={`/login?user=${userid}`}
            title="Snap!"
            buttonText="Login"
        >
            <p className="text-content my-3 text-[14px] text-center">
                You&apos;re not logged in, to follow this user, please login
                first
            </p>
        </Modal>
    );
};

export default FollowUserModal;
