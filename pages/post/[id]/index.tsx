import React from "react";
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

const Index = () => {
  const threadIdParams = window.location.pathname.split("/")[2];
  const { data, isLoading, isFetching } = useQuery("post", async () => {
    return await getThreadService(Number(threadIdParams)).catch(() =>
      toast.error("Error fetching thread")
    );
  });
  const threadData = data as unknown as IThread;
  return (
    <PageContainer>
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
              <Vote count={200} />
            </div>
            <p className="text-sm text-content">
              Posted by <span className="text-primary font-bold">Jager32</span>{" "}
              12 hours ago
            </p>
            <h1 className="text-[20px] md:text-[30px] text-white mt-2">
              {threadData?.threadtitle}
            </h1>
            <div className="text-white text-[14px] opacity-60 mt-2 my-5">
              {parse(threadData.threadcontent)}
            </div>
            <CommentCount count={threadData?.comment_count} />
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
