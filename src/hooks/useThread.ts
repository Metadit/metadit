import {
    createThreadService,
    editThreadService,
    getThreadCommentsService,
    getThreadService,
    postCommentVoteService,
} from "../services/threads";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext, useUser } from "../contexts/User";
import toast from "react-hot-toast";
import {
    IComment,
    ICommentVote,
    ICommentVoteResponse,
    IThread,
    IThreadCreate,
} from "../services/threads/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import voteCountUpdater from "../helpers/vote";
import { supabase } from "../supabase";

export const useThread = () => {
    const { user } = useContext(UserContext);
    const [editLoading, setEditLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [commentPlayAnimation, setCommentPlayAnimation] = useState(false);
    const queryClient = useQueryClient();

    const deleteImage = async (
        fileImageUrls: { fileName: string; fileUrl: string }[],
        content: string
    ) => {
        if (fileImageUrls.length === 0) return;
        if (fileImageUrls.length > 0) {
            const checkContentForFile = content.match(/<img src="(.+?)"/g);
            const fileNames = fileImageUrls.map(file => file.fileName);
            if (!checkContentForFile) {
                await supabase.storage.from("threads").remove(fileNames);
            } else {
                return;
            }
        }
    };

    const editThread = async (
        threadTitle: IThreadCreate["threadTitle"],
        threadContent: IThreadCreate["threadContent"],
        fileImageUrls: { fileName: string; fileUrl: string }[],
        threadId: number
    ) => {
        try {
            setEditLoading(true);
            await deleteImage(fileImageUrls, threadContent);
            await editThreadService(threadId, threadTitle, threadContent);
            toast.success("Thread edited successfully");
        } catch {
            toast.error("Error editing thread");
        } finally {
            setEditLoading(false);
        }
    };
    const { isLoading: commentVoteLoading, mutate: commentVoteMutate } =
        useMutation<ICommentVoteResponse, Error, any>(
            async (data: {
                type: "comment" | "reply";
                direction: "up" | "down";
                comment: ICommentVote;
                commentId?: number;
            }) => {
                const postData = await postCommentVoteService(
                    data.comment,
                    data.direction
                );
                if (data.commentId) {
                    return { ...postData, commentid: data.commentId };
                } else {
                    return postData;
                }
            },
            {
                onSuccess: data => {
                    queryClient.setQueryData<IComment[] | undefined>(
                        "threadComments",
                        oldData => {
                            if (data.commentid && data.replyid === null) {
                                if (data && oldData) {
                                    return oldData.map(comment => {
                                        if (comment.id === data.commentid) {
                                            return {
                                                ...comment,
                                                vote_count: voteCountUpdater(
                                                    comment.vote_count,
                                                    data.vote,
                                                    comment.did_user_vote
                                                ),
                                                did_user_vote:
                                                    comment.did_user_vote ===
                                                    data.vote
                                                        ? 0
                                                        : data.vote,
                                            };
                                        }
                                        return comment;
                                    });
                                }
                            } else if (
                                data.replyid !== null &&
                                data.commentid
                            ) {
                                if (data && oldData) {
                                    return oldData.map(comment => {
                                        if (comment.id === data.commentid) {
                                            return {
                                                ...comment,
                                                replies: comment.replies.map(
                                                    reply => {
                                                        if (
                                                            reply.id ===
                                                            data.replyid
                                                        ) {
                                                            return {
                                                                ...reply,
                                                                vote_count:
                                                                    voteCountUpdater(
                                                                        reply.vote_count,
                                                                        data.vote,
                                                                        reply.did_user_vote
                                                                    ),
                                                                did_user_vote:
                                                                    reply.did_user_vote ===
                                                                    data.vote
                                                                        ? 0
                                                                        : data.vote,
                                                            };
                                                        }
                                                        return reply;
                                                    }
                                                ),
                                            };
                                        }
                                        return comment;
                                    });
                                }
                            }
                        }
                    );
                },
            }
        );

    const createThread = async (
        threadTitle: IThreadCreate["threadTitle"],
        threadContent: IThreadCreate["threadContent"],
        fileImageUrls: { fileName: string; fileUrl: string }[]
    ) => {
        try {
            setCreateLoading(true);
            await deleteImage(fileImageUrls, threadContent);
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
        editThread,
        editLoading,
        setCommentPlayAnimation,
        commentPlayAnimation,
        commentMutate: {
            commentVoteLoading,
            commentVoteMutate,
        },
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

