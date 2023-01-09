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

export interface IComment {
  display_name: string | null;
  wallet_address: string;
  id: number;
  comment: string;
  threadid: number;
  did_user_vote: number;
  vote_count: number;
  userid: number;
  datepublished: string;
}

export interface ICommentVote {
  commentId: number;
  userId: number;
  threadId: number;
  vote: number;
  currentUserVote: number;
  direction?: string;
}

export const createThreadService = async (
  body: IThreadCreate
): Promise<{ id: number }> => {
  return await postAuthenticatedRequest("threads/create", body);
};

export const getThreadService = async (
  threadId: number,
  userId?: number
): Promise<IThread> => {
  return await getRequest("threads/thread", { threadId, userId });
};

export const postVoteService = async (
  args: IVote
): Promise<Omit<IVote, "user_wallet" | "voteid">> => {
  return await postAuthenticatedRequest("threads/thread/vote", args);
};
export const getThreadsService = async (
  userid?: number
): Promise<IThread[]> => {
  return await getRequest("threads/threads", {
    userid,
  });
};

export const commentThreadService = async (
  body: Omit<
    IComment,
    | "datepublished"
    | "id"
    | "wallet_address"
    | "display_name"
    | "did_user_vote"
    | "vote_count"
  >
): Promise<IComment> => {
  return await postAuthenticatedRequest("threads/comment", body);
};

export const getThreadCommentsService = async (
  threadId: number,
  userId?: number
): Promise<IComment[]> => {
  return await getRequest("threads/comments", {
    threadId,
    userId,
  });
};

export const postCommentVoteService = async (args: ICommentVote) => {
  return await postAuthenticatedRequest("threads/comment/vote", args);
};

export const deleteVoteService = async (
  vote_id: number
): Promise<{ id: number }> => {
  return await deleteAuthenticatedRequest("threads/vote", { id: vote_id });
};
