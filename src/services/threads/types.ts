export interface IThreadCreate {
    userId: number;
    threadTitle: string;
    threadContent: string;
}

export interface IThread {
    threadid: number;
    did_user_vote: 1 | -1 | 0;
    userid: number;
    voteid: number;
    comment_count: number;
    vote_count: number;
    user_wallet: string;
    threadtitle: string;
    threadcontent: string;
    datepublished: string;
}

export interface IThreadVoteResponse {
    created_at: string;
    id: string;
    threadid: number;
    userid: number;
    vote: 1 | -1;
}

export interface IVote {
    threadId: number;
    userId: number;
    voteid?: number;
    direction?: string;
    currentUserVote?: number;
    vote: 1 | -1;
}

export interface IComment {
    display_name: string | null;
    wallet_address: string;
    id: number;
    comment: string;
    threadid: number;
    threadCreatorId: number;
    did_user_vote: -1 | 1 | 0;
    vote_count: number;
    image_url: string;
    userid: number;
    datepublished: string;
    replies: ICommentReply[];
}

export interface ICommentReply {
    id: number;
    vote_count: number;
    did_user_vote: -1 | 1 | 0;
    commentid: number;
    threadid: number;
    threadCreatorId: number;
    commentCreatorId: number;
    comment: string;
    userid: number;
    datepublished: string;
    image_url: string;
    wallet_address: string;
    display_name: string | null;
}

export interface ICommentVoteResponse {
    threadid: number;
    voteid: number;
    vote: -1 | 1;
    commentid: number | null;
    replyid: number | null;
}

export interface ICommentVote {
    commentid?: number | undefined;
    replyid?: number | undefined;
    userid: number;
    threadid: number;
    vote: -1 | 1;
    currentUserVote: number;
    direction?: string;
}

export interface ICommentReport {
    commentid?: number | undefined;
    replyid?: number | undefined;
    userid: number;
    threadid: number;
    reason: string;
}
