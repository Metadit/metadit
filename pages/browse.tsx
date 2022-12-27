import React from "react";
import ContentTabs from "../components/pages/browse/ContentTabs";
import Post from "../components/pages/browse/Post";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";

const Browse = () => {
  return (
    <PageContainer pageTitle="Browse Metadit">
      <ContentTabs />
      <div className="flex flex-col gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Post key={i} />
        ))}
      </div>
    </PageContainer>
  );
};

export default Browse;

Browse.getLayout = (page: any) => <Layout>{page}</Layout>;
