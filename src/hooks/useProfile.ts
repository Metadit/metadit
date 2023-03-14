import { useQuery } from "react-query";
import {
    userActivityService,
    userProfileService,
    userThreadsService,
} from "../services/profile";
import toast from "react-hot-toast";
import { useUser } from "../contexts/User";
import { useEffect } from "react";
import {
    IUserActivity,
    IUserProfile,
    IUserThreads,
} from "../services/profile/types";

interface IUseProfile {
    activity: {
        data?: IUserActivity;
        isLoading: boolean;
        isFetching: boolean;
    };
    userProfile: {
        data?: IUserProfile;
        isLoading: boolean;
        isFetching: boolean;
    };
    threads: {
        data?: IUserThreads[];
        isLoading: boolean;
        isFetching: boolean;
    };
}

export const useProfile = (userId: number): IUseProfile => {
    const { user } = useUser();
    const {
        data: activity,
        isLoading: activityLoading,
        isFetching: activityIsFetching,
        refetch: activityRefetch,
    } = useQuery({
        queryKey: ["userActivity"],
        queryFn: () => userActivityService(userId),
        onError: () => {
            toast.error("Error fetching user activity");
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
    const {
        data: profile,
        isLoading: userProfileLoading,
        isFetching: userProfileIsFetching,
        refetch: userProfileRefetch,
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => userProfileService(userId, user?.id),
        onError: () => {
            toast.error("Error fetching user profile");
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
    const {
        data: threads,
        isLoading: threadsLoading,
        isFetching: threadsIsFetching,
        refetch: threadsRefetch,
    } = useQuery({
        queryKey: ["userThreads"],
        queryFn: () => userThreadsService(userId),
        onError: () => {
            toast.error("Error fetching user threads");
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
    useEffect(() => {
        if (userId) {
            activityRefetch();
            userProfileRefetch();
            threadsRefetch();
        }
    }, [activityRefetch, threadsRefetch, userId, userProfileRefetch]);
    return {
        activity: {
            data: activity,
            isLoading: activityLoading,
            isFetching: activityIsFetching,
        },
        userProfile: {
            data: profile,
            isLoading: userProfileLoading,
            isFetching: userProfileIsFetching,
        },
        threads: {
            data: threads,
            isLoading: threadsLoading,
            isFetching: threadsIsFetching,
        },
    };
};
