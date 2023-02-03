import React, { useState } from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import Vote from "../../../components/pages/browse/Vote";
import CommentCount from "../../../components/pages/browse/CommentCount";
import { useMutation, useQueryClient } from "react-query";
import { commentThreadService } from "../../../services/threads";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import Loading from "../../../components/global/Loading";
import moment from "moment";
import Link from "next/link";
import { useUser } from "../../../contexts/User";
import Button from "../../../components/global/Button";
import TextAreaBox from "../../../components/global/TextAreaBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { useThreadService } from "../../../hooks/useThread";
import Comment from "../../../components/pages/post/Comment";
import { NextPageContext } from "next";
import { useInputForm } from "../../../hooks/useInputForm";
import { IComment, IThread } from "../../../services/threads/types";

const Index = ({ id: threadId }: { id: number }) => {
    const { onChangeHandler, inputValues, setInputValues } = useInputForm({
        comment: "",
    });
    const { user } = useUser();
    const queryClient = useQueryClient();
    const { thread, comments } = useThreadService(Number(threadId));
    const [playAnimation, setPlayAnimation] = useState(false);

    const { isLoading: commentSubmitLoading, mutate: commentSubmit } =
        useMutation(
            async () => {
                if (inputValues.comment && comments.data && thread && user) {
                    return await commentThreadService({
                        threadid: Number(threadId),
                        userid: user.id,
                        comment: inputValues.comment,
                        datepublished: new Date().toISOString(),
                    });
                }
            },
            {
                onSuccess: data => {
                    toast.success("Comment posted!");
                    setInputValues({ comment: "" });
                    queryClient.setQueryData<IThread | undefined>(
                        "thread",
                        oldData => {
                            if (oldData) {
                                return {
                                    ...oldData,
                                    comment_count: oldData.comment_count + 1,
                                };
                            }
                        }
                    );
                    queryClient.setQueryData<IComment[] | undefined>(
                        "threadComments",
                        oldData => {
                            if (user && oldData && data) {
                                return [
                                    {
                                        ...data,
                                        display_name: user.display_name,
                                        wallet_address: user.wallet_address,
                                        vote_count: 0,
                                        did_user_vote: 0,
                                        replies: [],
                                        image_url: user.image_url || "",
                                    },
                                    ...oldData,
                                ];
                            }
                        }
                    );
                },
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
                        <Vote
                            playAnimation={playAnimation}
                            setPlayAnimation={setPlayAnimation}
                            individualThread={true}
                            thread={thread.data}
                            count={thread.data?.vote_count as number}
                        />
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
                                className="w-full bg-darkContent p-5 my-10
                             border border-zinc-800 rounded-xl text-center"
                            >
                                <div>
                                    <p className="text-white">
                                        Want to comment and be part of the
                                        conversation?
                                    </p>
                                    <Link href={`/login?post=${threadId}`}>
                                        <Button
                                            normal={false}
                                            className="mt-3 bg-primaryDark border border-primary
                                             w-full max-w-fit mx-auto"
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
                                    onChange={onChangeHandler}
                                    name="comment"
                                    value={inputValues.comment}
                                    className="w-full h-[140px]"
                                    rows={5}
                                />
                                <Button
                                    onClick={commentSubmit}
                                    normal={false}
                                    disabled={
                                        inputValues.comment?.length === 0 ||
                                        commentSubmitLoading
                                    }
                                    className={`mt-4 bg-primaryDark border border-primary w-full
                max-w-[100px] mx-auto`}
                                >
                                    {commentSubmitLoading ? (
                                        <Loading noAbsolute={true} size={20} />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        )}
                        <div className="flex flex-col gap-5">
                            {comments.data?.map((comment, index) => {
                                return (
                                    <Comment
                                        threadCreator={thread.data?.userid}
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

export const getServerSideProps = ({ query }: NextPageContext) => {
    return { props: { id: query.id } };
};

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
