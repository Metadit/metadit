import React, { RefObject, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../src/contexts/Modal";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  title: string;
}
const Modal = ({ children, title }: Props) => {
  const { setActiveModal } = useModal();
  const modalRef: RefObject<HTMLDivElement> = useRef(null);
  const outSideClickHandler = (e: any) => {
    if (modalRef.current !== null && !modalRef.current.contains(e.target)) {
      setActiveModal(null);
    }
  };
  return (
    <div
      className="w-full h-full fixed z-[100] bg-zinc-800 bg-opacity-50 flex justify-center
     items-center top-0 left-0"
      onClick={outSideClickHandler}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] h-auto p-5 border border-zinc-800
       bg-contentBg rounded-md relative"
      >
        <div
          onClick={() => setActiveModal(null)}
          className="bg-contentBg rounded-full bg-zinc-800
          absolute w-8 h-8 border border-zinc-700
           flex items-center justify-center right-[-7px] top-[-7px] transition-all duration-200
           hover:brightness-110 cursor-pointer"
        >
          <FontAwesomeIcon className="text-zinc-400" icon={faTimes} />
        </div>
        <h1 className="text-white text-center font-bold text-[20px]">
          {title}
        </h1>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
