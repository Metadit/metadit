import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useThread } from "../../../src/hooks/useThread";
import { IThread } from "../../../src/services/threads";
import { useUser } from "../../../src/contexts/User";

interface Props {
  count: number;
  thread: IThread;
  onVoteUpdate: (vote: number) => void;
}

const Vote = ({ count, thread, onVoteUpdate }: Props) => {
  const { voteHandler } = useThread();
  const { user } = useUser();
  const onVote = async () => {
    await voteHandler(
      {
        threadId: thread.threadid,
        userId: user?.id as number,
        currentUserVote: thread.did_user_vote,
        vote: 1,
      },
      "up"
    );
    onVoteUpdate(1);
  };
  return (
    <div className="flex flex-col gap-2 absolute left-[-20px] ml-2">
      <div
        onClick={onVote}
        className={`${
          thread.did_user_vote === 1
            ? "bg-primary border border-transparent"
            : "bg-contentBg"
        } w-[35px] border border-zinc-700
            h-[35px] flex items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
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
        onClick={() => {
          voteHandler(
            {
              threadId: thread.threadid,
              currentUserVote: thread.did_user_vote,
              userId: user?.id as number,
              vote: -1,
            },
            "down"
          );
          onVoteUpdate(-1);
        }}
        className={`${
          thread.did_user_vote === -1
            ? "bg-primary border border-transparent"
            : "bg-contentBg"
        } w-[35px] border border-zinc-700
            h-[35px] flex items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
      >
        <FontAwesomeIcon className="text-white" icon={faArrowDown} />
      </div>
    </div>
  );
};

export default Vote;
