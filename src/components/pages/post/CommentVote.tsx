import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../contexts/User";
import { IComment } from "../../../services/threads";
import { useThread } from "../../../hooks/useThread";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface Props {
  count: number;
  onVoteUpdate: (vote: number, commentId: number) => void;
  comment: IComment;
}

const CommentVote = ({ count, onVoteUpdate, comment }: Props) => {
  const { user } = useUser();
  const { commentVoteHandler } = useThread();
  const router = useRouter();
  const onVote = async (direction: "up" | "down") => {
    if (user && comment) {
      await commentVoteHandler(
        {
          commentId: comment.id,
          threadId: comment.threadid,
          userId: user.id,
          currentUserVote: comment.did_user_vote,
          vote: direction === "up" ? 1 : -1,
        },
        direction
      );
      onVoteUpdate(direction === "up" ? 1 : -1, comment.id);
    } else {
      if (!user) {
        return router.push("/login").then(() => {
          toast.error("You must be logged in to vote");
        });
      }
    }
  };
  return (
    <div className="flex gap-2">
      <div
        onClick={() => onVote("up")}
        className={`${
          comment?.did_user_vote === 1
            ? "bg-primary border border-transparent"
            : "bg-contentBg"
        } w-[35px] border border-zinc-700
            h-[30px] flex items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
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
        onClick={() => onVote("down")}
        className={`${
          comment?.did_user_vote === -1
            ? "bg-primary border border-transparent"
            : "bg-contentBg"
        } flex border border-zinc-700
            text-white w-[35px] h-[30px] items-center justify-center rounded-md
            transition-all duration-200 hover:bg-primary
            hover:border-transparent cursor-pointer text-[12px]`}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
    </div>
  );
};

export default CommentVote;
