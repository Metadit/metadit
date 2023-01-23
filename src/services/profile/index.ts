import {
    deleteAuthenticatedRequest,
    getRequest,
    postAuthenticatedRequest,
} from "../requests";
import { IUserActivity, IUserProfile, IUserThreads } from "./types";

export const userActivityService = async (
    userId: number
): Promise<IUserActivity[]> => {
    return await getRequest("user/activity", {
        userId,
    });
};

export const userProfileService = async (
    userId: number,
    followerId?: number
): Promise<IUserProfile> => {
    return await getRequest("user/profile", {
        userId,
        followerId,
    });
};

export const userThreadsService = async (
    userId: number
): Promise<IUserThreads[]> => {
    return await getRequest("user/threads", {
        userId,
    });
};

export const followUserService = async (
    userId: number,
    followerId: number
): Promise<{ message: string }> => {
    return await postAuthenticatedRequest("user/follow", {
        userId,
        followerId,
    });
};

export const unfollowUserService = async (
    userId: number,
    followerId: number
): Promise<{ message: string }> => {
    return await deleteAuthenticatedRequest("user/follow", {
        userId,
        followerId,
    });
};
