import React from "react";
import ContentTabs from "../components/pages/browse/ContentTabs";
import Post from "../components/pages/browse/Post";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import { useQuery } from "react-query";
import { getThreadsService, IThread } from "../src/services/threads";
import toast from "react-hot-toast";
import Loading from "../components/global/Loading";

const Browse = () => {
  const { data, isLoading, isFetching } = useQuery(
    "threads",
    async () => {
      return await getThreadsService().catch(() => {
        toast.error("Error fetching posts");
      });
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return (
    <PageContainer pageTitle="Browse Metadit">
      <ContentTabs />
      <div className="flex flex-col gap-5 relative">
        {isLoading || isFetching ? (
          <div className="mt-32">
            <Loading size={30} />
          </div>
        ) : (
          data?.map((post: IThread) => <Post data={post} key={post.threadid} />)
        )}
      </div>
    </PageContainer>
  );
};

export default Browse;

Browse.getLayout = (page: any) => <Layout>{page}</Layout>;
