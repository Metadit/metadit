import React from "react";
import ActivityRecord from "./ActivityRecord";
import Loading from "../../global/Loading";
import { IUserActivity } from "../../../src/services/profile";

interface Props {
  data: IUserActivity[] | undefined;
  activityLoading: boolean;
  isFetching: boolean;
}
const Activity = ({ data, activityLoading, isFetching }: Props) => {
  return (
    <div className="rounded bg-darkContent border border-zinc-800 p-6 basis-7/12 grow relative h-[400px]">
      <h2 className="text-white font-bold text-lg mb-5">Activity</h2>
      {activityLoading || isFetching ? (
        <Loading size={30} />
      ) : !activityLoading && !isFetching && data?.length === 0 ? (
        <p className="text-zinc-500 w-full h-full top-0 left-0 absolute flex justify-center items-center">
          No activity
        </p>
      ) : (
        <div className="overflow-hidden h-[300px] overflow-y-scroll pr-2 relative">
          {data?.map((activity) => (
            <ActivityRecord data={activity} key={activity.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;
