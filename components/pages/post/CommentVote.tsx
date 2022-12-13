import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  count: number;
}

const CommentVote = ({ count }: Props) => {
  return (
    <div className="flex gap-2">
      <div
        className="bg-contentBg w-[35px] border border-zinc-700
      h-[30px] flex items-center justify-center rounded-md transition-all
      duration-200 hover:bg-primary hover:border-transparent cursor-pointer"
      >
        <FontAwesomeIcon className="text-white text-[12px]" icon={faArrowUp} />
      </div>
      <div
        className="bg-contentBg w-[35px] border border-zinc-700
      h-[30px] flex items-center justify-center rounded-md"
      >
        <p className="text-white text-[12px]">{count}</p>
      </div>
      <div
        className="bg-contentBg flex border border-zinc-700
      text-white w-[35px] h-[30px] items-center justify-center rounded-md
      transition-all duration-200 hover:bg-primary
      hover:border-transparent cursor-pointer text-[12px]"
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
    </div>
  );
};

export default CommentVote;
