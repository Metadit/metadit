export const USER_TOKEN_KEY = "metadit";

enum EThreadParams {
    post = "post",
    user = "user",
}

export const THREAD_ID_PARAM_OPTIONS: Record<EThreadParams, string> = {
    post: "post",
    user: "user",
};
