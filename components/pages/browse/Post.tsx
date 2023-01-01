import React from "react";
import parse from "html-react-parser";
import CommentCount from "./CommentCount";
import Vote from "./Vote";
import Link from "next/link";
import { IThread } from "../../../src/services/threads";
import moment from "moment";

interface Props {
  data: IThread;
}
const Post = ({ data }: Props) => {
  return (
    <div
      className="w-full
      border border-zinc-800 bg-contentBg
      rounded-xl h-auto px-10 py-5 relative"
    >
      <div>
        <Vote count={data.vote_count} />
      </div>
      <Link className="w-full" href={`/post/${data.id}`}>
        <p className="text-[12px] text-content">
          Posted by{" "}
          <Link href={`/profile/${data.userid}`}>
            <span
              className="text-primary transition-all duration-200
            font-bold hover:opacity-80"
            >
              {data.user_wallet.substring(0, 10) + "..."}
            </span>{" "}
          </Link>
          {moment(data.datepublished).fromNow()}
        </p>
        <p className="text-white text-[20px] mt-2">{data.threadtitle}</p>
        <div className="text-white text-[14px] opacity-60 mt-2 my-10">
          {parse(data.threadcontent)}
        </div>
      </Link>
      <CommentCount count={data.comment_count} />
    </div>
  );
};

export default Post;
