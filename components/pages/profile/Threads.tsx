import React from "react";
import ThreadCard from "./ThreadCard";
import Loading from "../../global/Loading";
import { IUserThreads } from "../../../src/services/profile";

interface Props {
  data: IUserThreads[] | undefined;
  threadsLoading: boolean;
  isFetching: boolean;
}

const Threads = ({ data, threadsLoading, isFetching }: Props) => {
  return (
    <div
      className="h-[80%] rounded bg-darkContent border border-zinc-800 p-10
    basis-7/12 grow overflow-hidden"
    >
      <h2 className="text-white font-bold text-lg mb-5">Threads created</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[300px] overflow-y-scroll pr-2 relative">
        {threadsLoading || isFetching ? (
          <Loading size={30} />
        ) : (
          data?.map((thread) => <ThreadCard thread={thread} key={thread.id} />)
        )}
      </div>
    </div>
  );
};

export default Threads;
