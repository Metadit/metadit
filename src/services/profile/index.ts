import { getAuthenticatedRequest, getRequest } from "../requests";
import { IUserLocalStorage } from "../../types/user";

export interface IUserActivity {
  id: number;
  userid: number;
  threadid: number;
  commenttitle: string;
  commentcontent: string;
  datepublished: string;
}

export const userActivityService = async (
  userId: number
): Promise<IUserActivity[]> => {
  return await getRequest("user/activity", {
    userId,
  });
};

export interface IUserProfile {
  id: number;
  date_registered: string;
  display_name: string | null;
  userId: number;
  wallet_address: string;
}

export const userProfileService = async (
  userId: number
): Promise<IUserProfile> => {
  return await getRequest("user/profile", {
    userId,
  });
};

export interface IUserThreads {
  id: number;
  userid: number;
  threadtitle: string;
  threadcontent: string;
  datepublished: string;
  vote_count: number;
  comment_count: number;
}

export const userThreadsService = async (
  userId: number
): Promise<IUserThreads[]> => {
  return await getRequest("user/threads", {
    userId,
  });
};
