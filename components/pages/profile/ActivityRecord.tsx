import React from "react";
import { IUserActivity } from "../../../src/services/profile";

interface Props {
  data: IUserActivity | undefined;
}
const ActivityRecord = ({ data }: Props) => {
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
