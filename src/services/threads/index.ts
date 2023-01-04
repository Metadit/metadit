import { getRequest, postAuthenticatedRequest } from "../requests";

export interface IThreadCreate {
  userId: number;
  threadTitle: string;
  threadContent: string;
}

export interface IThread {
  threadid: number;
  did_user_vote: string;
  userid: number;
  comment_count: number;
  vote_count: number;
  user_wallet: string;
  threadtitle: string;
  threadcontent: string;
  datepublished: string;
}

export interface IVote {
  threadId: number;
  userId: number;
  direction: string | "up" | "down" | null;
}

export const createThreadService = async (
  body: IThreadCreate
): Promise<{ id: number }> => {
  return await postAuthenticatedRequest("threads/create", body);
};

export const getThreadService = async (threadId: number): Promise<IThread> => {
  return await getRequest("threads/thread", { threadId });
};

export const postVoteService = async (
  args: IVote
): Promise<Omit<IVote, "user_wallet">> => {
  return await postAuthenticatedRequest("threads/vote", args);
};
export const getThreadsService = async (
  userid?: number
): Promise<IThread[]> => {
  return await getRequest("threads/threads", {
    userid,
  });
};
