import {
  getAuthenticatedRequest,
  getRequest,
  postAuthenticatedRequest,
} from "../requests";

export interface IThreadCreate {
  userId: number;
  threadTitle: string;
  threadContent: string;
}

export interface IThread {
  id: number;
  userid: number;
  comment_count: number;
  vote_count: number;
  user_wallet: string;
  threadtitle: string;
  threadcontent: string;
  datepublished: string;
}

export const createThreadService = async (
  body: IThreadCreate
): Promise<{ id: number }> => {
  return await postAuthenticatedRequest("threads/create", body);
};

export const getThreadService = async (threadId: number): Promise<IThread> => {
  return await getAuthenticatedRequest("threads/thread", { threadId });
};

export const getThreadsService = async (): Promise<IThread[]> => {
  return await getRequest("threads/threads");
};
