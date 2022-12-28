import { getAuthenticatedRequest } from "../requests";

export const userActivityService = async (userId: number) => {
  return await getAuthenticatedRequest("user/activity", {
    userId,
  });
};

export const userThreadsService = async (userId: number) => {
  return await getAuthenticatedRequest("user/threads", {
    userId,
  });
};
