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
    replies: ICommentReply[];
}

export interface ICommentReply {
    id: number;
    vote_count: number;
    did_user_vote: number;
    commentid: number;
    threadid: number;
    comment: string;
    userid: number;
    datepublished: string;
    wallet_address: string;
    display_name: string | null;
}

export interface ICommentVote {
    commentid?: number | undefined;
    replyid?: number | undefined;
    userid: number;
    threadid: number;
    vote: number;
    currentUserVote: number;
    direction?: string;
}
