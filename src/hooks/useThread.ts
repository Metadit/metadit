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
    const router = useRouter();

    const commentVoteHandler = async (
        args: ICommentVote,
        direction: string
    ) => {
        if (!user) {
            await redirectWithError(
                "You must be logged in to vote",
                "/login",
                router
            );
        }
        try {
            await postCommentVoteService({
                userId: args.userId as number,
                commentId: args.commentId as number,
                threadId: args.threadId as number,
                currentUserVote: args.currentUserVote,
                vote: args.vote,
                direction: direction,
            });
        } catch (error) {
            toast.error("Error voting");
        }
    };
    const voteHandler = async (args: IVote, direction: string) => {
        if (!user) {
            await redirectWithError(
                "You must be logged in to vote",
                "/login",
                router
            );
        }
        try {
            await postVoteService({
                userId: args.userId as number,
                threadId: args.threadId as number,
                currentUserVote: args.currentUserVote,
                vote: args.vote,
                direction: direction,
            });
        } catch (error) {
            toast.error("Error voting");
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
        voteHandler,
        commentVoteHandler,
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
    }, [threadInfo]);

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
