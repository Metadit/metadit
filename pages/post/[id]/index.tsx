import React, { useEffect } from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import Vote from "../../../components/pages/browse/Vote";
import CommentCount from "../../../components/pages/browse/CommentCount";
import Comments from "../../../components/pages/post/comments";
import { useQuery } from "react-query";
import { getThreadService, IThread } from "../../../src/services/threads";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import Loading from "../../../components/global/Loading";
import moment from "moment";
import Link from "next/link";
import { voteCountUpdater } from "../../../src/helpers/vote";
import { useUser } from "../../../src/contexts/User";

const Index = () => {
  const [post, setPost] = React.useState<IThread | null>(null);
  const { user } = useUser();
  const threadIdParams = window.location.pathname.split("/")[2];
  const { data, isLoading, isFetching } = useQuery("post", async () => {
    return await getThreadService(Number(threadIdParams), user?.id).catch(() =>
      toast.error("Error fetching thread")
    );
  });
  const postData = data as unknown as IThread;
  useEffect(() => {
    if (postData) {
      setPost({ ...postData, threadid: Number(threadIdParams) });
    }
  }, [postData, threadIdParams]);

  const postVoteUpdater = (vote: number) => {
    if (post) {
      setPost({
        ...post,
        vote_count: voteCountUpdater(post.vote_count, vote, post.did_user_vote),
        did_user_vote: post.did_user_vote === vote ? 0 : vote,
      });
    }
  };

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
        {isLoading || isFetching ? (
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
            <div
              placeholder="What are your thoughts?"
              contentEditable={true}
              onInput={(e) => console.log(e.currentTarget.textContent)}
              className="mt-10 text-[14px] bg-darkContent text-white resize-none
          transition-all duration-200 border border-zinc-800 w-full
          rounded-md h-36 focus:outline-0 focus:border-primary p-5"
            />
            <div className="my-10">
              <Comments />
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Index;

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
