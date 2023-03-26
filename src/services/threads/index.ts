import {
    deleteAuthenticatedRequest,
    getAuthenticatedRequest,
    getRequest,
    postAuthenticatedRequest,
    putAuthenticatedRequest,
} from "../requests";
import {
    IComment,
    ICommentReply,
    ICommentReport,
    ICommentVote,
    ICommentVoteResponse,
    IThread,
    IThreadCreate,
    IThreadVoteResponse,
    IVote,
} from "./types";

export const createThreadService = async (
    body: IThreadCreate
): Promise<{ id: number }> => {
    return await postAuthenticatedRequest("threads/create", body);
};

export const editThreadService = async (
    threadId: number,
    threadTitle: string,
    threadContent: string
): Promise<{ id: number }> => {
    return await putAuthenticatedRequest("threads/thread", {
        threadId,
        threadTitle,
        threadContent,
    });
};

export const getEditThreadService = async (
    threadId: number
): Promise<IThread> => {
    return await getAuthenticatedRequest("threads/thread/edit", { threadId });
};

export const getThreadService = async (
    threadId: number,
    userId?: number
): Promise<IThread> => {
    return await getRequest("threads/thread", { threadId, userId });
};

export const postVoteService = async (
    args: IVote
): Promise<IThreadVoteResponse> => {
    return await postAuthenticatedRequest("threads/thread/vote", args);
};
export const getThreadsService = async (
    userid?: number,
    type?: "hot" | "new" | "top" | null | string,
    offset?: number,
    limit?: number
): Promise<IThread[]> => {
    return await getRequest("threads/threads", {
        userid,
        type,
        offset,
        limit,
    });
};

export const commentThreadService = async (
    body: Omit<
        IComment,
        | "id"
        | "wallet_address"
        | "display_name"
        | "did_user_vote"
        | "vote_count"
        | "image_url"
        | "replies"
        | "datepublished"
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

export const postCommentVoteService = async (
    args: ICommentVote,
    direction: "up" | "down"
): Promise<ICommentVoteResponse> => {
    return await postAuthenticatedRequest("threads/comment/vote", {
        ...args,
        direction,
    });
};

export const postCommentReplyService = async (
    args: Omit<
        ICommentReply,
        "datepublished" | "id" | "did_user_vote" | "vote_count" | "image_url"
    >
) => {
    return await postAuthenticatedRequest("threads/comment/reply", args);
};

export const reportCommentService = async (
    args: ICommentReport
): Promise<{ message: string }> => {
    return await postAuthenticatedRequest("threads/comment/report", args);
};

export const deleteThreadService = async (
    thread_id: number
): Promise<{ id: number }> => {
    return await deleteAuthenticatedRequest("threads/thread", {
        threadid: thread_id,
    });
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
