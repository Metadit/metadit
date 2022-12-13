import React from "react";
import ActivityRecord from "./ActivityRecord";

const Activity = () => {
  return (
    <div className="rounded bg-darkContent border border-zinc-800 p-6 basis-7/12 grow">
      <h2 className="text-white font-bold text-lg mb-5">Activity</h2>
      <div className="overflow-hidden h-[300px] overflow-y-scroll pr-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <ActivityRecord key={i} />
        ))}
      </div>
    </div>
  );
};

export default Activity;
