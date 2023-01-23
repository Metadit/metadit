export interface IUserThreads {
    threadid: number;
    userid: number;
    threadtitle: string;
    threadcontent: string;
    datepublished: string;
    vote_count: number;
    comment_count: number;
}

export interface IUserProfile {
    id: number;
    date_registered: string;
    display_name: string | null;
    follower_count: number;
    did_user_follow: boolean;
    userId: number;
    wallet_address: string;
}

export interface IUserActivity {
    userid: number;
    threadid: number;
    comment: string;
    threadtitle: string;
}
