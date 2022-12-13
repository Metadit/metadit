import React from "react";
import ThreadCard from "./ThreadCard";

const Threads = () => {
  return (
    <div
      className="h-[80%] rounded bg-darkContent border border-zinc-800 p-10
    basis-7/12 grow overflow-hidden"
    >
      <h2 className="text-white font-bold text-lg mb-5">Threads created</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[300px] overflow-y-scroll pr-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <ThreadCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Threads;
