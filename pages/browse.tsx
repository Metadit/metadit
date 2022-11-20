import React from "react";
import ContentTabs from "../components/pages/browse/ContentTabs";
import Post from "../components/pages/browse/Post";
import Layout from "../components/global/Layout";

const Browse = () => {
  return (
    <div className="w-full max-w-[1400px] px-10 mx-auto mt-20">
      <ContentTabs />;
      <div className="flex flex-col gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Post key={i} />
        ))}
      </div>
    </div>
  );
};

export default Browse;

Browse.getLayout = (page: any) => <Layout>{page}</Layout>;
