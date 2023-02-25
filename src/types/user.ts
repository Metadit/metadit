export interface IUserLocalStorage {
    token: string;
    id: number;
    date_registered: string;
    display_name: string | null;
    message: string;
    wallet_address: string;
    image_url: string | null;
}

export interface IUserAuthTokenDecoded {
    exp: number;
    iat: number;
    wallet_address: string;
    signature: string;
}

export interface IUserNotifications {
    id: number;
    created_at: string;
    message: string;
    reply_id: number | null;
    read: boolean;
    comment_id: number | null;
    thread_id: number | null;
    user_id: number;
    user_id_trigger: number;
    type: string;
}
