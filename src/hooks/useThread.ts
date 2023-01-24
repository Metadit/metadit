import {
    createThreadService,
    getThreadCommentsService,
    getThreadService,
    postCommentVoteService,
    postVoteService,
} from "../services/threads";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext, useUser } from "../contexts/User";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import {
    IComment,
    ICommentReply,
    ICommentVote,
    IThread,
    IThreadCreate,
    IVote,
} from "../services/threads/types";
import redirectWithError from "../helpers/redirectWithError";
import { useQuery } from "react-query";

export const useThread = () => {
    const { user } = useContext(UserContext);
    const [createLoading, setCreateLoading] = useState(false);
    const [voteLoading, setVoteLoading] = useState(false);
    const [commentPlayAnimation, setCommentPlayAnimation] = useState(false);
    const router = useRouter();

    const commentOnVote = async (
        direction: "up" | "down",
        onVoteUpdate: (direction: number, comment: IComment) => void,
        comment: IComment
    ) => {
        if (user && comment) {
            if (comment) {
                await commentVoteHandler(
                    {
                        commentid: comment.id,
                        replyid: undefined,
                        threadid: comment.threadid,
                        userid: user.id,
                        currentUserVote: comment.did_user_vote,
                        vote: direction === "up" ? 1 : -1,
                    },
                    direction
                );
                onVoteUpdate(direction === "up" ? 1 : -1, comment);
                setCommentPlayAnimation(true);
            } else {
                return router.push("/login").then(() => {
                    toast.error("You must be logged in to vote");
                });
            }
        }
    };

    const replyOnVote = async (
        direction: "up" | "down",
        onVoteUpdate: (direction: number, comment: ICommentReply) => void,
        commentReply: ICommentReply
    ) => {
        if (user && commentReply) {
            await commentVoteHandler(
                {
                    commentid: undefined,
                    replyid: commentReply.id,
                    threadid: commentReply.threadid,
                    userid: user.id,
                    currentUserVote: commentReply.did_user_vote,
                    vote: direction === "up" ? 1 : -1,
                },
                direction
            );
            onVoteUpdate(direction === "up" ? 1 : -1, commentReply);
            setCommentPlayAnimation(true);
        } else {
            return router.push("/login").then(() => {
                toast.error("You must be logged in to vote");
            });
        }
    };

    async function commentVoteHandler(args: ICommentVote, direction: string) {
        if (!user) {
            await redirectWithError("You must be logged in to vote", "/login");
        }
        try {
            setVoteLoading(true);
            await postCommentVoteService({
                userid: args.userid,
                threadid: args.threadid,
                currentUserVote: args.currentUserVote,
                vote: args.vote,
                direction: direction,
                replyid: args.replyid,
                commentid: args.commentid,
            });
        } catch (error) {
            toast.error("Error voting");
        } finally {
            setVoteLoading(false);
        }
    }

    const voteHandler = async (args: IVote, direction: string) => {
        if (!user) {
            await redirectWithError("You must be logged in to vote", "/login");
        }
        try {
            setVoteLoading(true);
            await postVoteService({
                userId: args.userId,
                threadId: args.threadId,
                currentUserVote: args.currentUserVote,
                vote: args.vote,
                direction: direction,
            });
        } catch (error) {
            toast.error("Error voting");
        } finally {
            setVoteLoading(false);
        }
    };

    const createThread = async (
        threadTitle: IThreadCreate["threadTitle"],
        threadContent: IThreadCreate["threadContent"]
    ) => {
        try {
            setCreateLoading(true);
            if (user) {
                const { id } = await createThreadService({
                    userId: user.id,
                    threadTitle,
                    threadContent,
                });
                return id;
            }
        } catch {
            toast.error("Error creating thread");
        } finally {
            setCreateLoading(false);
        }
    };

    return {
        createThread,
        createLoading,
        commentOnVote,
        voteHandler,
        replyOnVote,
        voteLoading,
        setCommentPlayAnimation,
        commentPlayAnimation,
    };
};

export const useThreadService = (threadId: number) => {
    const [thread, setThread] = useState<IThread | undefined>();
    const { user } = useUser();
    const [comments, setCommentsData] = useState<IComment[] | undefined>();

    const {
        data: threadData,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["thread"],
        queryFn: () => getThreadService(threadId, user?.id),
        refetchOnWindowFocus: false,
    });
    const {
        data: commentsData,
        isLoading: commentsLoading,
        isFetching: commentsFetching,
    } = useQuery({
        queryKey: ["threadComments"],
        queryFn: () => getThreadCommentsService(threadId, user?.id),
        refetchOnWindowFocus: false,
    });

    const threadInfo = useCallback(() => {
        if (threadData && commentsData) {
            setThread(threadData);
            setCommentsData(commentsData);
        }
    }, [threadData, commentsData]);

    useEffect(() => {
        threadInfo();
    }, [threadInfo, threadId]);

    return {
        thread: {
            setThread,
            data: thread,
            isLoading,
            isFetching,
        },
        comments: {
            setCommentsData,
            data: comments,
            isLoading: commentsLoading,
            isFetching: commentsFetching,
        },
    };
};
