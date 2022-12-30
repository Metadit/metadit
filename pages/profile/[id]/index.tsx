import React from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import User from "../../../components/pages/profile/User";
import Activity from "../../../components/pages/profile/Activity";
import Threads from "../../../components/pages/profile/Threads";
import { useProfile } from "../../../src/hooks/useProfile";
import {
  IUserActivity,
  IUserProfile,
  IUserThreads,
} from "../../../src/services/profile";

const Index = () => {
  const userIdParams = window.location.pathname.split("/")[2];
  const { activity, threads, userProfile } = useProfile(Number(userIdParams));
  return (
    <PageContainer>
      <div
        className="w-full h-auto p-6 bg-contentBg
       border border-zinc-800 rounded mt-5"
      >
        <div className="flex flex-wrap gap-4">
          <User
            profileLoading={userProfile.isLoading}
            isFetching={userProfile.isFetching}
            data={userProfile.data as unknown as IUserProfile}
          />
          <Activity
            activityLoading={activity.isLoading}
            isFetching={activity.isFetching}
            data={activity.data as unknown as IUserActivity[]}
          />
          <Threads
            threadsLoading={threads.isLoading}
            isFetching={threads.isFetching}
            data={threads.data as unknown as IUserThreads[]}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
