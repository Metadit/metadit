import { useQuery } from "react-query";
import {
  userActivityService,
  userProfileService,
  userThreadsService,
} from "../services/profile";
import toast from "react-hot-toast";

export const useProfile = (userId: number) => {
  const {
    data: activity,
    isLoading: activityLoading,
    isFetching: activityIsFetching,
  } = useQuery(
    "userActivity",
    async () => {
      return await userActivityService(userId).catch(() =>
        toast.error("Error fetching user activity")
      );
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const {
    data: profile,
    isLoading: userProfileLoading,
    isFetching: userProfileIsFetching,
  } = useQuery(
    "userProfile",
    async () => {
      return await userProfileService(userId).catch(() =>
        toast.error("Error fetching user profile")
      );
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const {
    data: threads,
    isLoading: threadsLoading,
    isFetching: threadsIsFetching,
  } = useQuery(
    "userThreads",
    async () => {
      return await userThreadsService(userId).catch(() =>
        toast.error("Error fetching user threads")
      );
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
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
