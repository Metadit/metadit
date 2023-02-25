import { getAuthenticatedRequest, postAuthenticatedRequest } from "../requests";

export const getUserService = async () => {
    return await getAuthenticatedRequest("user/data");
};

export const uploadImageService = async (userId: number, imageUrl: string) => {
    return await postAuthenticatedRequest("user/profile/image", {
        userId,
        imageUrl,
    });
};

export const markNotificationAsReadService = async (userId: number) => {
    return await postAuthenticatedRequest("user/notifications/read", {
        userId,
    });
};
