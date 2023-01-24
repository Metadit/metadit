import React, { SetStateAction, useRef } from "react";
import { useUser } from "../../contexts/User";
import Avatar from "react-avatar";
import {
    faCaretDown,
    faCog,
    faSignOut,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import Image from "next/image";

const logoutHandler = () => {
    localStorage.removeItem("metadit");
    window.location.replace("/");
};

interface Props {
    toggleDropDown?: React.Dispatch<SetStateAction<boolean>>;
    dropDown?: boolean;
    className?: string;
}

const UserDropdown = ({ className }: Props) => {
    const { user } = useUser();
    const dropDownRef = useRef<HTMLDivElement>(null);
    const [dropDown, toggleDropDown] = useDetectOutsideClick(
        dropDownRef,
        false
    );
    const dropDownLinks = [
        { icon: faUser, text: "Profile", href: `/profile/${user?.id}` },
        { icon: faCog, text: "Settings", href: "/settings" },
        { icon: faSignOut, text: "Logout", href: "/", onClick: logoutHandler },
    ];
    return (
        <div
            ref={dropDownRef}
            onClick={() => (toggleDropDown ? toggleDropDown(!dropDown) : null)}
            className={`text-white text-[12px] relative
        flex items-center justify-between gap-1 cursor-pointer
        transition-all w-auto px-5 py-2 lg:py-0 rounded-md hover:transition-all
        hover:duration-200 hover:brightness-125 bg-zinc-800 border border-zinc-700 ${className}`}
        >
            <AnimatePresence>
                {dropDown && <Dropdown links={dropDownLinks} />}
            </AnimatePresence>
            <div className="flex items-center overflow-hidden">
                {user?.image_url ? (
                    <Image
                        className="rounded-full mr-2"
                        width={20}
                        height={20}
                        src={user?.image_url + `?${Date.now()}`}
                        alt="user"
                    />
                ) : (
                    <Avatar
                        className="mr-2 align-top"
                        name={user?.wallet_address}
                        size="20"
                        round={true}
                    />
                )}
                {user?.wallet_address && (
                    <p className="text-[13px] w-full max-w-[300px] lg:max-w-[60px] overflow-hidden text-ellipsis">
                        {user?.wallet_address}
                    </p>
                )}
            </div>
            <motion.div
                animate={{
                    rotate: dropDown ? 180 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                <FontAwesomeIcon icon={faCaretDown} />
            </motion.div>
        </div>
    );
};

export default UserDropdown;
