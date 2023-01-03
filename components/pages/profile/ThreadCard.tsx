import React from "react";
import Button from "../../global/Button";
import { IUserThreads } from "../../../src/services/profile";
import parse from "html-react-parser";
import Link from "next/link";

interface Props {
  thread: IUserThreads;
}
const ThreadCard = ({ thread }: Props) => {
  return (
    <div className="w-full border rounded rounded-xl border-zinc-800 p-4 text-center h-[200px]">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h1 className="text-white font-bold text-[18px]">
            {thread.threadtitle}
          </h1>
          <div className="text-content text-sm my-2 leading-6">
            {parse(thread.threadcontent)}
          </div>
        </div>
        <Link href={`/post/${thread.threadid}`}>
          <Button normal={false} className="bg-primary w-[30%] mx-auto mt-5">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ThreadCard;
