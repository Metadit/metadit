import { useUser } from "../contexts/User";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useEffect } from "react";
import { supabase } from "../supabase";
import { IUserNotifications } from "../types/user";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { markNotificationAsReadService } from "../services/user";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { RefObject } from "preact";
import { userNotificationsService } from "../services/profile";

export const useNotifications = (ref: RefObject<HTMLDivElement>) => {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(
        ref,
        false
    );

    const { data, isRefetching, isLoading, refetch } = useQuery(
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
    return {
        toggleDropdown,
        setToggleDropdown,
        markAsReadHandler,
        notifications: {
            data,
            isRefetching,
            isLoading,
            refetch,
        },
    };
};
