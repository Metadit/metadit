import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

const ActivityRecord = () => {
  return (
    <div className="w-full mx-auto rounded p-4 bg-darkContent border border-zinc-800 mb-2">
      <p className="text-white text-sm text-center">
        User commented on thread{" "}
        <span className="text-primary font-bold transition-all duration-200 hover:brightness-125 cursor-pointer">
          This guy was walking and he just fell randomly
        </span>
      </p>
    </div>
  );
};

export default ActivityRecord;
