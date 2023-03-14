import React, { useEffect, useRef } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userNotificationsService } from "../../../services/profile";
import { useUser } from "../../../contexts/User";
import Loading from "../Loading";
import { IUserNotifications } from "../../../types/user";
import { markNotificationAsReadService } from "../../../services/user";
import toast from "react-hot-toast";
import { supabase } from "../../../supabase";
import parse from "html-react-parser";

const Notifications = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(
        dropdownRef,
        false
    );
    const { user } = useUser();
    const queryClient = useQueryClient();

    useEffect(() => {
        const channel = supabase
            .channel("changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                    filter: "user_id=eq." + user?.id,
                },
                (payload: { new: IUserNotifications }) => {
                    const data = payload.new;
                    queryClient.setQueryData<IUserNotifications[]>(
                        "notifications",
                        old => {
                            if (old) {
                                return [data, ...old];
                            }
                            return [data];
                        }
                    );
                    toast.success(() => <div>{parse(data.message)}</div>, {
                        position: "top-right",
                        icon: "🔔",
                        duration: 5000,
                    });
                }
            )
            .subscribe();
        return () => {
            channel.unsubscribe();
        };
    }, [queryClient, user?.id]);

    const {
        data: notifications,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery(
        "notifications",
        async () => {
            return user && (await userNotificationsService(user?.id));
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const { mutate: markAsReadHandler } = useMutation(
        async () => {
            return user && (await markNotificationAsReadService(user?.id));
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("notifications");
                toast.success("All notifications marked as read");
                setToggleDropdown(false);
            },
            onError: () => {
                toast.error("Something went wrong");
            },
        }
    );

    useEffect(() => {
        if (toggleDropdown && user) {
            (async () => {
                await refetch();
            })();
        }
    }, [toggleDropdown, refetch, user]);

    const areAllRead = notifications?.every(
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
                            <Loading color="white" size={30} />
                        ) : notifications?.length === 0 ? (
                            <p className="text-content mt-[100px]">
                                No Notifications
                            </p>
                        ) : (
                            notifications?.map((data: IUserNotifications) => (
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
