import React, { ForwardedRef, forwardRef, memo, useState } from "react";
import parse from "html-react-parser";
import CommentCount from "./CommentCount";
import Vote from "./Vote";
import Link from "next/link";
import moment from "moment";
import voteCountUpdater from "../../../helpers/vote";
import { IThread } from "../../../services/threads/types";

interface Props {
    data: IThread;
    threads: IThread[];
}

const Post = memo(
    forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
        const { threads, data } = props;
        const [playAnimation, setPlayAnimation] = useState(false);
        const [threadVoteClick, setThreadVoteClick] = useState<IThread | null>(
            null
        );

        const threadVoteUpdater = (vote: number) => {
            const newThreads = threads.map(thread => {
                if (thread.threadid === data.threadid) {
                    return {
                        ...thread,
                        vote_count: voteCountUpdater(
                            thread.vote_count,
                            vote,
                            thread.did_user_vote
                        ),
                        did_user_vote: thread.did_user_vote === vote ? 0 : vote,
                    };
                }
                return thread;
            });
            setPlayAnimation(true);
        };

        return (
            <div
                onClick={() => setThreadVoteClick(data)}
                ref={ref}
                className="w-full
      border border-zinc-800 bg-contentBg
      rounded-xl h-auto px-10 py-5 relative"
            >
                <Vote
                    onVoteUpdate={(vote: number) => {
                        threadVoteUpdater(vote);
                    }}
                    thread={data}
                    playAnimation={playAnimation}
                    setPlayAnimation={setPlayAnimation}
                    threadVoteClick={threadVoteClick}
                    count={data.vote_count}
                />
                <div className="w-full">
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
                    <Link href={`/post/${data.threadid}`}>
                        <p className="text-white text-[20px] mt-2">
                            {data.threadtitle}
                        </p>
                        <div className="text-white text-[14px] opacity-60 mt-2 my-10">
                            {parse(data.threadcontent)}
                        </div>
                    </Link>
                </div>
                <CommentCount count={data.comment_count} />
            </div>
        );
    })
);

Post.displayName = "ThreadBrowse";
export default Post;
