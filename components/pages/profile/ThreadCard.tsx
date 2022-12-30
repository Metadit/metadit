import React from "react";
import Button from "../../global/Button";
import { IUserThreads } from "../../../src/services/profile";
import parse from "html-react-parser";

interface Props {
  thread: IUserThreads;
}
const ThreadCard = ({ thread }: Props) => {
  return (
    <div className="w-full border  rounded rounded-xl border-zinc-800 p-4 text-center">
      <h1 className="text-white font-bold text-[18px]">{thread.threadtitle}</h1>
      <p className="text-content text-sm my-2 leading-6">
        {parse(thread.threadcontent)}
      </p>
      <Button normal={false} className="bg-primary w-[30%] mx-auto mt-5">
        View
      </Button>
    </div>
  );
};

export default ThreadCard;
