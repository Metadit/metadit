import React, { useRef } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { AnimatePresence, motion } from "framer-motion";

const Notifications = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(
        dropdownRef,
        false
    );

    return (
        <div ref={dropdownRef} className="relative">
            <Button
                onClick={() => setToggleDropdown(!toggleDropdown)}
                className="w-auto px-3 relative"
                normal={true}
            >
                <FontAwesomeIcon icon={faBell} />
                <span
                    className="w-[6px] h-[6px] bg-red-500 rounded-xl
                 absolute top-[9px] left-[11px]"
                />
            </Button>
            <AnimatePresence>
                {toggleDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        className="absolute w-[250px] p-2
                bg-contentBg border border-zinc-800 left-0
                text-[13px] top-9 rounded-md text-center
                flex flex-col gap-1.5 h-[200px]"
                    >
                        <Notification />
                        <Notification />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
