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
    post_count: number;
    display_name: string | null;
    follower_count: number;
    did_user_follow: boolean;
    userId: number;
    image_url: string | null;
    wallet_address: string;
}

export interface IUserActivity {
    userid: number;
    threadid: number;
    comment: string;
    threadtitle: string;
}
