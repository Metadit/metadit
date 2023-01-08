import React, { useEffect } from "react";
import Layout from "../../../components/global/Layout";
import PageContainer from "../../../components/global/PageContainer";
import User from "../../../components/pages/profile/User";
import Activity from "../../../components/pages/profile/Activity";
import Threads from "../../../components/pages/profile/Threads";
import { useProfile } from "../../../hooks/useProfile";
import UserNotFound from "./userNotFound";

const Index = () => {
  const userIdParams = window.location.pathname.split("/")[2];
  const { activity, threads, userProfile } = useProfile(Number(userIdParams));

  useEffect(() => {
    if (isNaN(Number(userIdParams))) {
      window.location.href = "/404";
    }
  }, [userIdParams]);

  return (
    <PageContainer>
      {userProfile.data && Object.keys(userProfile.data as {}).length === 0 ? (
        <UserNotFound />
      ) : (
        <div
          className="w-full h-auto p-6 bg-contentBg
       border border-zinc-800 rounded mt-5"
        >
          <div className="flex flex-wrap gap-4">
            <User
              profileLoading={userProfile.isLoading}
              isFetching={userProfile.isFetching}
              data={userProfile.data}
            />
            <Activity
              activityLoading={activity.isLoading}
              isFetching={activity.isFetching}
              data={activity.data}
            />
            <Threads
              threadsLoading={threads.isLoading}
              isFetching={threads.isFetching}
              data={threads.data}
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Index;

Index.getLayout = (page: any) => <Layout>{page}</Layout>;
