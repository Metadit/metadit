import React, { Dispatch, SetStateAction, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useThread } from "../../../hooks/useThread";
import { useUser } from "../../../contexts/User";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { IThread } from "../../../services/threads/types";
import { useMutation } from "react-query";
import Button from "../../global/Button";
import Lottie from "lottie-react";
import foam from "../../../lottieJsons/confetti.json";

interface Props {
    count: number;
    thread?: IThread | null;
    onVoteUpdate: (vote: number) => void;
    threadVoteClick?: IThread | null;
    setPlayAnimation: Dispatch<SetStateAction<boolean>>;
    playAnimation: boolean;
    individualThread?: boolean;
}

const Vote = ({
    count,
    thread,
    onVoteUpdate,
    threadVoteClick,
    playAnimation,
    individualThread,
    setPlayAnimation,
}: Props) => {
    const { voteHandler } = useThread();
    const { user } = useUser();
    const router = useRouter();
    const lottieRef = useRef<any>(null);
    const individualThreadCheck =
        individualThread && thread?.did_user_vote === 1 && playAnimation;
    const threadsBrowsingCheck =
        threadVoteClick?.threadid === thread?.threadid &&
        playAnimation &&
        thread?.did_user_vote === 1;

    const { isLoading: voteSubmitLoading, mutate: voteSubmit } = useMutation(
        async (direction: string) => {
            if (user && thread) {
                await voteHandler(
                    {
                        threadId: thread.threadid,
                        userId: user.id,
                        currentUserVote: thread.did_user_vote,
                        vote: direction === "up" ? 1 : -1,
                    },
                    direction
                );
                onVoteUpdate(direction === "up" ? 1 : -1);
            } else {
                if (!user) {
                    return router.push("/login").then(() => {
                        toast.error("You must be logged in to vote");
                    });
                }
            }
        }
    );

    return (
        <div className="flex flex-col gap-2 absolute left-[-20px] ml-2 z-[2]">
            {(threadsBrowsingCheck || individualThreadCheck) && (
                <div className="absolute w-[150px] h-[150px] top-[-80px] left-[-60px] z-[-1]">
                    <Lottie
                        lottieRef={lottieRef}
                        onLoopComplete={() => setPlayAnimation(false)}
                        animationData={foam}
                        height={150}
                        width={150}
                    />
                </div>
            )}
            <Button
                normal={false}
                disabled={voteSubmitLoading}
                onClick={() => voteSubmit("up")}
                className={`${
                    thread?.did_user_vote === 1
                        ? "bg-primary border border-transparent"
                        : "bg-contentBg"
                } w-[35px] px-0 border border-zinc-700
            h-[35px] flex focus:scale-75 items-center justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
            >
                <FontAwesomeIcon className="text-white" icon={faArrowUp} />
            </Button>
            <div
                className="bg-contentBg w-[35px] border border-zinc-700
      h-[35px] flex items-center justify-center rounded-md"
            >
                <p className="text-white text-[14px]">{count}</p>
            </div>
            <Button
                normal={false}
                disabled={voteSubmitLoading}
                onClick={() => voteSubmit("down")}
                className={`${
                    thread?.did_user_vote === -1
                        ? "bg-primary border border-transparent"
                        : "bg-contentBg"
                } w-[35px] px-0 border border-zinc-700
            h-[35px] flex items-center focus:scale-75 justify-center rounded-md transition-all
            duration-200 hover:bg-primary hover:border-transparent cursor-pointer`}
            >
                <FontAwesomeIcon className="text-white" icon={faArrowDown} />
            </Button>
        </div>
    );
};

export default Vote;
