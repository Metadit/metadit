import React, { Dispatch, SetStateAction, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../contexts/User";
import { IThread, IThreadVoteResponse } from "../../../services/threads/types";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../global/Button";
import Lottie from "lottie-react";
import foam from "../../../lottieJsons/confetti.json";
import { toast } from "react-hot-toast/headless";
import redirectWithError from "../../../helpers/redirectWithError";
import voteCountUpdater from "../../../helpers/vote";
import { postVoteService } from "../../../services/threads";

interface Props {
    count: number;
    thread?: IThread | null;
    threadVoteClick?: IThread | null;
    setPlayAnimation: Dispatch<SetStateAction<boolean>>;
    playAnimation: boolean;
    individualThread?: boolean;
}

const Vote = ({
    count,
    thread,
    threadVoteClick,
    playAnimation,
    individualThread,
    setPlayAnimation,
}: Props) => {
    const { user } = useUser();
    const lottieRef = useRef<any>(null);
    const queryClient = useQueryClient();
    const individualThreadCheck =
        individualThread && thread?.did_user_vote === 1 && playAnimation;
    const threadsBrowsingCheck =
        threadVoteClick?.threadid === thread?.threadid &&
        playAnimation &&
        thread?.did_user_vote === 1;

    const { isLoading: voteSubmitLoading, mutate: voteSubmit } = useMutation<
        IThreadVoteResponse | undefined,
        Error,
        string
    >(
        async (direction: string) => {
            if (user && thread) {
                return await postVoteService({
                    threadId: thread.threadid,
                    userId: user.id,
                    currentUserVote: thread.did_user_vote,
                    vote: direction === "up" ? 1 : -1,
                    direction,
                });
            } else {
                return Promise.reject("User not logged in");
            }
        },
        {
            onSuccess: data => {
                if (individualThread) {
                    queryClient.setQueryData<IThread | undefined>(
                        "thread",
                        oldData => {
                            if (data && oldData) {
                                return {
                                    ...oldData,
                                    vote_count: voteCountUpdater(
                                        oldData.vote_count,
                                        data.vote,
                                        oldData.did_user_vote
                                    ),
                                    did_user_vote:
                                        oldData.did_user_vote === data.vote
                                            ? 0
                                            : data.vote,
                                };
                            }
                        }
                    );
                } else {
                    queryClient.setQueryData<any>(
                        "threads",
                        (oldData: { pages: IThread[][] }) => {
                            if (data && oldData) {
                                const updateThread = oldData.pages[0].map(
                                    (page: IThread) => {
                                        if (data.threadid === page.threadid) {
                                            return {
                                                ...page,
                                                vote_count: voteCountUpdater(
                                                    page.vote_count,
                                                    data.vote,
                                                    page.did_user_vote
                                                ),
                                                did_user_vote:
                                                    page.did_user_vote ===
                                                    data.vote
                                                        ? 0
                                                        : data.vote,
                                            };
                                        }
                                        return page;
                                    }
                                );
                                return {
                                    ...oldData,
                                    pages: [updateThread],
                                };
                            }
                        }
                    );
                }
                setPlayAnimation(true);
            },
            onError: async (error: Error | string) => {
                if (error === "User not logged in") {
                    return await redirectWithError(
                        "You must be logged in to vote",
                        "/login"
                    );
                } else {
                    toast.error("Something went wrong");
                }
            },
        }
    );

    return (
        <div className="flex flex-col gap-2 absolute left-[-20px] ml-2 z-[10]">
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
                        ? "bg-primaryDark border-primary border"
                        : "bg-contentBg border border-zinc-700"
                } w-[35px] px-0
            h-[35px] flex items-center justify-center rounded-md
            hover:bg-primaryDark hover:border-primary cursor-pointer`}
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
                        ? "bg-primaryDark border border-primary"
                        : "bg-contentBg border border-zinc-700"
                } w-[35px] px-0
            h-[35px] flex items-center justify-center rounded-md
            hover:bg-primaryDark hover:border-primary cursor-pointer`}
            >
                <FontAwesomeIcon className="text-white" icon={faArrowDown} />
            </Button>
        </div>
    );
};

export default Vote;
