import React from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import Vote from "../../../components/pages/browse/Vote";
import Image from "next/image";
import meme from "../../../assets/images/meme.png";
import CommentCount from "../../../components/pages/browse/CommentCount";
import Comments from "../../../components/pages/post/comments";

const Index = () => {
  return (
    <PageContainer>
      <div
        className="w-full
      border border-zinc-800 bg-contentBg
      rounded-xl h-auto px-10 py-5 relative"
      >
        <div>
          <Vote count={200} />
        </div>
        <p className="text-sm text-content">
          Posted by <span className="text-primary">Jager32</span> 12 hours ago
        </p>
        <h1 className="text-[20px] md:text-[30px] text-white mt-2">
          Saw a guy walking the other day and this is what happened
        </h1>
        <Image className="my-5" src={meme} alt="meme" />
        <CommentCount count={322} />
        <textarea
          placeholder="What are your thoughts?"
          className="mt-10 text-[14px] bg-darkContent text-white resize-none
          transition-all duration-200 border border-zinc-800 w-full
          rounded-md h-36 focus:outline-0 focus:border-primary p-5"
        />
        <div className="my-10">
          <Comments />
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
