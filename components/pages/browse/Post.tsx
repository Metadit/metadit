import React from "react";
import Image from "next/image";
import meme from "../../../assets/images/meme.png";
import CommentCount from "./CommentCount";
import Vote from "./Vote";
import Link from "next/link";

const Post = () => {
  return (
    <div
      className="w-full
      border border-zinc-800 bg-contentBg
      rounded-xl h-auto px-10 py-5 relative"
    >
      <div>
        <Vote count={200} />
      </div>
      <p className="text-sm text-content">
        Posted by <span className="text-primary font-bold">Jager32</span> 12
        hours ago
      </p>
      <Link href="/post/1">
        <h1 className="text-[20px] md:text-[30px] text-white mt-2">
          Saw a guy walking the other day and this is what happened
        </h1>
        <Image className="my-5" src={meme} alt="meme" />
      </Link>
      <CommentCount count={322} />
    </div>
  );
};

export default Post;
