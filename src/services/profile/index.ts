import axios from "axios";
import { getAuthenticatedRequest } from "../requests";

export const userActivityService = async (user_id: number) => {
  return await getAuthenticatedRequest("user/activity", {
    user_id,
  });
};

export const userThreadsService = async (user_id: number) => {
  return await getAuthenticatedRequest("user/threads", {
    user_id,
  });
};
