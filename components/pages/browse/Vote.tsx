import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  count: number;
}

const Vote = ({ count }: Props) => {
  return (
    <div className="flex flex-col gap-2 absolute left-[-20px]">
      <div
        className="bg-contentBg w-[35px] border border-zinc-700
      h-[35px] flex items-center justify-center rounded-md transition-all
      duration-200 hover:bg-primary hover:border-transparent cursor-pointer"
      >
        <FontAwesomeIcon className="text-white" icon={faArrowUp} />
      </div>
      <div
        className="bg-contentBg w-[35px] border border-zinc-700
      h-[35px] flex items-center justify-center rounded-md"
      >
        <p className="text-white text-[14px]">{count}</p>
      </div>
      <div
        className="bg-contentBg flex border border-zinc-700
      text-white w-[35px] h-[35px] items-center justify-center rounded-md
      transition-all duration-200 hover:bg-primary
      hover:border-transparent cursor-pointer"
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
    </div>
  );
};

export default Vote;
