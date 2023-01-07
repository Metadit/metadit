import { getRequest } from "../requests";

export interface IUserActivity {
  userid: number;
  threadid: number;
  comment: string;
  threadtitle: string;
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
  threadid: number;
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
