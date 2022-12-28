import React, { useContext } from "react";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import User from "../components/pages/profile/User";
import Activity from "../components/pages/profile/Activity";
import Threads from "../components/pages/profile/Threads";
import { useQuery } from "react-query";
import {
  userActivityService,
  userThreadsService,
} from "../src/services/profile";
import { UserContext } from "../src/contexts/User";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { data: activity, isLoading: activityLoading } = useQuery(
    "userActivity",
    () => {
      userActivityService(user?.id as number).catch(() =>
        toast.error("Error fetching user activity")
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: threads, isLoading: threadsLoading } = useQuery(
    "userThreads",
    () => {
      userThreadsService(user?.id as number).catch(() =>
        toast.error("Error fetching user threads")
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <PageContainer>
      <div
        className="w-full h-auto p-6 bg-contentBg
       border border-zinc-800 rounded mt-5"
      >
        <div className="flex flex-wrap gap-4">
          <User />
          <Activity activityLoading={activityLoading} data={activity} />
          <Threads threadsLoading={threadsLoading} data={threads} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;

Profile.getLayout = (page: any) => <Layout>{page}</Layout>;
