import { getRequest } from "../requests"
import { IUserActivity, IUserProfile, IUserThreads } from "./types"

export const userActivityService = async (
    userId: number
): Promise<IUserActivity[]> => {
    return await getRequest("user/activity", {
        userId,
    })
}

export const userProfileService = async (
    userId: number
): Promise<IUserProfile> => {
    return await getRequest("user/profile", {
        userId,
    })
}

export const userThreadsService = async (
    userId: number
): Promise<IUserThreads[]> => {
    return await getRequest("user/threads", {
        userId,
    })
}
