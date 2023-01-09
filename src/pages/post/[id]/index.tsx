import React, { useEffect, useState } from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import Vote from "../../../components/pages/browse/Vote";
import CommentCount from "../../../components/pages/browse/CommentCount";
import Comments from "../../../components/pages/post/comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    commentThreadService,
    getThreadCommentsService,
    getThreadService,
} from "../../../services/threads";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import Loading from "../../../components/global/Loading";
import moment from "moment";
import Link from "next/link";
import voteCountUpdater from "../../../helpers/vote";
import { useUser } from "../../../contexts/User";
import Button from "../../../components/global/Button";
import { IThread } from "../../../services/threads/types";
import TextAreaBox from "../../../components/global/TextAreaBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
    const [post, setPost] = useState<IThread | null>(null);
    const [commentInput, setCommentInput] = useState<string>("");
    const queryClient = useQueryClient();
    const { user } = useUser();
    const threadIdParams = window.location.pathname.split("/")[2];
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["thread", threadIdParams],
        queryFn: () => getThreadService(Number(threadIdParams), user?.id),
        refetchOnWindowFocus: false,
    });
    const {
        data: comments,
        isLoading: commentsLoading,
        isFetching: commentsFetching,
    } = useQuery({
        queryKey: ["threadComments", threadIdParams],
        queryFn: () =>
            getThreadCommentsService(Number(threadIdParams), user?.id),
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            setPost(data);
        }
    }, [data]);

    const postVoteUpdater = (vote: number) => {
        if (post) {
            setPost({
                ...post,
                vote_count: voteCountUpdater(
                    post.vote_count,
                    vote,
                    post.did_user_vote
                ),
                did_user_vote: post.did_user_vote === vote ? 0 : vote,
            });
        }
    };

    const { isLoading: commentSubmitLoading, mutate: commentSubmit } =
        useMutation(
            () => {
                if (commentInput && post && user) {
                    return commentThreadService({
                        threadid: Number(threadIdParams),
                        userid: user.id,
                        comment: commentInput,
                    });
                } else {
                    return Promise.reject("No comment input");
                }
            },
            {
                onError: () => {
                    toast.error("Error while posting comment");
                },
                onSuccess: () => {
                    setCommentInput("");
                    queryClient.invalidateQueries(["threadComments"]);
                    toast.success("Comment posted!");
                },
            }
        );

    return (
        <PageContainer
            pageTitle={`${
                isLoading || isFetching ? "Metadit Thread" : post?.threadtitle
            }`}
        >
            <div
                className="w-full
      border border-zinc-800 bg-contentBg
      rounded-xl h-auto min-h-[150px] px-10 py-5 relative"
            >
                {isLoading ||
                isFetching ||
                commentsLoading ||
                commentsFetching ? (
                    <Loading size={30} />
                ) : (
                    <>
                        <div>
                            <Vote
                                thread={post}
                                onVoteUpdate={(vote: number) => {
                                    postVoteUpdater(vote);
                                }}
                                count={post?.vote_count as number}
                            />
                        </div>
                        <p className="text-sm text-content">
                            Posted by{" "}
                            <Link
                                className="transition-all duration-200 hover:opacity-80"
                                href={`/profile/${post?.userid}`}
                            >
                                <span className="text-primary font-bold">
                                    {post?.user_wallet.substring(0, 10) + "..."}
                                </span>{" "}
                            </Link>
                            {moment(post?.datepublished).fromNow()}
                        </p>
                        <h1 className="text-[20px] md:text-[30px] text-white mt-2">
                            {post?.threadtitle}
                        </h1>
                        {post && (
                            <div className="text-white text-[14px] opacity-60 mt-2 my-5">
                                {parse(post.threadcontent)}
                            </div>
                        )}
                        <CommentCount count={post?.comment_count as number} />
                        {!user ? (
                            <div
                                className="w-full bg-darkContent p-6 my-10
                             border border-zinc-800 rounded-xl text-center"
                            >
                                <p className="text-white">
                                    Want to comment and be part of the
                                    conversation?
                                </p>
                                <Link href="/login">
                                    <Button
                                        normal={false}
                                        className="mt-5 bg-primary w-full max-w-fit mx-auto"
                                    >
                                        <FontAwesomeIcon icon={faSignIn} />
                                        Login and share your thoughts
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="my-10">
                                <TextAreaBox
                                    placeholder="What are your thoughts?"
                                    onChange={e =>
                                        setCommentInput(e.target.value)
                                    }
                                    value={commentInput}
                                    className="w-full h-[140px]"
                                    rows={5}
                                />
                                <Button
                                    onClick={commentSubmit}
                                    normal={false}
                                    disabled={
                                        commentInput?.length === 0 ||
                                        commentSubmitLoading
                                    }
                                    className={`mt-4 bg-primary w-full
                max-w-[100px] mx-auto`}
                                >
                                    {commentSubmitLoading ? (
                                        <Loading size={20} />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        )}
                        <div>
                            <Comments
                                commentsRefetching={commentsFetching}
                                commentsLoading={commentsLoading}
                                data={comments}
                            />
                        </div>
                    </>
                )}
            </div>
        </PageContainer>
    );
};

export default Index;

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
