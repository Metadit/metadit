import {
    deleteAuthenticatedRequest,
    getRequest,
    postAuthenticatedRequest,
} from "../requests";
import {
    IComment,
    ICommentReply,
    ICommentVote,
    IThread,
    IThreadCreate,
    IVote,
} from "./types";

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
        | "replies"
    >
): Promise<IComment> => {
    return await postAuthenticatedRequest("threads/comment", body);
};

export const getThreadCommentsService = async (
    threadId: number,
    userId?: number,
    limit?: number,
    offset?: number
): Promise<IComment[]> => {
    return await getRequest("threads/comments", {
        threadId,
        userId,
        limit,
        offset,
    });
};

export const postCommentVoteService = async (args: ICommentVote) => {
    return await postAuthenticatedRequest("threads/comment/vote", args);
};

export const postCommentReplyService = async (
    args: Omit<
        ICommentReply,
        "datepublished" | "id" | "did_user_vote" | "vote_count"
    >
) => {
    return await postAuthenticatedRequest("threads/comment/reply", args);
};

export const getCommentRepliesService = async (
    commentId: number,
    userId?: number
): Promise<ICommentReply[]> => {
    return await getRequest("threads/comment/reply", {
        commentId,
        userId,
    });
};

export const deleteVoteService = async (
    vote_id: number
): Promise<{ id: number }> => {
    return await deleteAuthenticatedRequest("threads/vote", { id: vote_id });
};

export const deleteCommentService = async (
    comment_id: number,
    isReply?: boolean
): Promise<{ id: number }> => {
    return await deleteAuthenticatedRequest("threads/comment", {
        commentId: comment_id,
        isReply: isReply,
    });
};
