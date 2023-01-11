import React, { useState } from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import Vote from "../../../components/pages/browse/Vote";
import CommentCount from "../../../components/pages/browse/CommentCount";
import { useMutation } from "react-query";
import { commentThreadService } from "../../../services/threads";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import Loading from "../../../components/global/Loading";
import moment from "moment";
import Link from "next/link";
import voteCountUpdater from "../../../helpers/vote";
import { useUser } from "../../../contexts/User";
import Button from "../../../components/global/Button";
import TextAreaBox from "../../../components/global/TextAreaBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import smile from "../../../../public/images/smile.png";
import Image from "next/image";
import { useThreadService } from "../../../hooks/useThread";
import Comment from "../../../components/pages/post/Comment";

const Index = () => {
    const [commentInput, setCommentInput] = useState<string>("");
    const { user } = useUser();
    const threadIdParams = window.location.pathname.split("/")[2];
    const { thread, comments } = useThreadService(Number(threadIdParams));

    const threadVoteUpdater = (vote: number) => {
        if (thread.data) {
            thread.setThread({
                ...thread.data,
                vote_count: voteCountUpdater(
                    thread.data.vote_count,
                    vote,
                    thread.data.did_user_vote
                ),
                did_user_vote: thread.data.did_user_vote === vote ? 0 : vote,
            });
        }
    };

    const { isLoading: commentSubmitLoading, mutate: commentSubmit } =
        useMutation(
            async () => {
                if (commentInput && comments.data && thread && user) {
                    const data = await commentThreadService({
                        threadid: Number(threadIdParams),
                        userid: user.id,
                        comment: commentInput,
                    });
                    setCommentInput("");
                    comments.setCommentsData([
                        {
                            ...data,
                            display_name: user.display_name,
                            wallet_address: user.wallet_address,
                            vote_count: 0,
                            did_user_vote: 0,
                        },
                        ...comments.data,
                    ]);
                    toast.success("Comment posted!");
                } else {
                    return Promise.reject("No comment input");
                }
            },
            {
                onError: () => {
                    toast.error("Error while posting comment");
                },
            }
        );

    return (
        <PageContainer
            pageTitle={`${
                thread.isLoading || thread.isFetching
                    ? "Metadit Thread"
                    : thread?.data?.threadtitle
            }`}
        >
            <div
                className="w-full
      border border-zinc-800 bg-contentBg
      rounded-xl h-auto min-h-[150px] px-10 py-5 relative"
            >
                {thread.isLoading ||
                thread.isFetching ||
                comments.isLoading ||
                comments.isFetching ? (
                    <Loading size={30} />
                ) : (
                    <>
                        <div>
                            <Vote
                                thread={thread.data}
                                onVoteUpdate={(vote: number) => {
                                    threadVoteUpdater(vote);
                                }}
                                count={thread.data?.vote_count as number}
                            />
                        </div>
                        <p className="text-sm text-content">
                            Posted by{" "}
                            <Link
                                className="transition-all duration-200 hover:opacity-80"
                                href={`/profile/${thread.data?.userid}`}
                            >
                                <span className="text-primary font-bold">
                                    {thread.data?.user_wallet.substring(0, 10) +
                                        "..."}
                                </span>{" "}
                            </Link>
                            {moment(thread.data?.datepublished).fromNow()}
                        </p>
                        <h1 className="text-[20px] md:text-[30px] text-white mt-2">
                            {thread.data?.threadtitle}
                        </h1>
                        {thread.data && (
                            <div className="text-white text-[14px] opacity-60 mt-2 my-5">
                                {parse(thread.data.threadcontent)}
                            </div>
                        )}
                        <CommentCount
                            count={thread.data?.comment_count as number}
                        />
                        {!user ? (
                            <div
                                className="w-full bg-darkContent p-10 my-10
                             border border-zinc-800 rounded-xl text-center"
                            >
                                <div>
                                    <Image
                                        className="mx-auto mb-5"
                                        src={smile}
                                        alt="login"
                                        width={100}
                                    />
                                    <p className="text-white mt-7">
                                        Want to comment and be part of the
                                        conversation?
                                    </p>
                                    <Link
                                        href={`/login?post=${threadIdParams}`}
                                    >
                                        <Button
                                            normal={false}
                                            className="mt-3 bg-primary w-full max-w-fit mx-auto"
                                        >
                                            <FontAwesomeIcon icon={faSignIn} />
                                            Login and share your thoughts
                                        </Button>
                                    </Link>
                                </div>
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
                        <div className="flex flex-col gap-10">
                            {comments.data?.map(comment => {
                                return (
                                    <Comment
                                        setComments={comments.setCommentsData}
                                        comments={comments.data}
                                        key={comment.id}
                                        comment={comment}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </PageContainer>
    );
};

export default Index;

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
