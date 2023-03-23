import React, { useEffect, useRef } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../../../contexts/User";
import Loading from "../Loading";
import { IUserNotifications } from "../../../types/user";
import { useNotifications } from "../../../hooks/useNotifications";

const Notifications = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();
    const {
        toggleDropdown,
        setToggleDropdown,
        markAsReadHandler,
        notifications,
    } = useNotifications(dropdownRef);
    const { refetch, isLoading, isRefetching, data } = notifications;

    useEffect(() => {
        if (toggleDropdown && user) {
            (async () => {
                await refetch();
            })();
        }
    }, [toggleDropdown, refetch, user]);

    const areAllRead = data?.every(
        (notification: IUserNotifications) => notification.read
    );

    return (
        <div ref={dropdownRef} className="relative">
            <Button
                onClick={() => setToggleDropdown(!toggleDropdown)}
                className="w-auto px-3 relative"
                normal={true}
            >
                <FontAwesomeIcon icon={faBell} />
                {isLoading || isRefetching ? null : areAllRead ? null : (
                    <span
                        className="w-[6px] h-[6px] bg-red-500 rounded-xl
                 absolute top-[9px] left-[11px]"
                    />
                )}
            </Button>
            <AnimatePresence>
                {toggleDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        className="absolute w-[250px] p-2
                bg-contentBg border border-zinc-800 right-0
                text-[13px] top-9 rounded-md text-center
                flex flex-col gap-1.5 h-[300px] overflow-y-auto"
                    >
                        <Button
                            onClick={() => markAsReadHandler()}
                            disabled={isLoading || isRefetching || areAllRead}
                            normal={true}
                            className="w-full py-4"
                        >
                            Mark all as read
                        </Button>
                        {isLoading || isRefetching ? (
                            <Loading />
                        ) : data?.length === 0 ? (
                            <p className="text-content mt-[100px]">
                                No Notifications
                            </p>
                        ) : (
                            data?.map((data: IUserNotifications) => (
                                <Notification
                                    closeMenu={() => setToggleDropdown(false)}
                                    data={data}
                                    key={data.id}
                                />
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;
