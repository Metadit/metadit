import {
  deleteAuthenticatedRequest,
  getRequest,
  postAuthenticatedRequest,
} from "../requests";

export interface IThreadCreate {
  userId: number;
  threadTitle: string;
  threadContent: string;
}

export interface IThread {
  threadid: number;
  did_user_vote: number;
  userid: number;
  voteid: number;
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
  voteid?: number;
  direction?: string;
  currentUserVote?: number;
  vote: number;
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
): Promise<Omit<IVote, "user_wallet" | "voteid">> => {
  return await postAuthenticatedRequest("threads/vote", args);
};
export const getThreadsService = async (
  userid?: number
): Promise<IThread[]> => {
  return await getRequest("threads/threads", {
    userid,
  });
};

export const deleteVoteService = async (
  vote_id: number
): Promise<{ id: number }> => {
  return await deleteAuthenticatedRequest("threads/vote", { id: vote_id });
};
