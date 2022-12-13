import React from "react";
import Layout from "../components/global/Layout";
import PageContainer from "../components/global/PageContainer";
import User from "../components/pages/profile/User";
import Activity from "../components/pages/profile/Activity";
import Threads from "../components/pages/profile/Threads";

const Profile = () => {
  return (
    <PageContainer>
      <div
        className="w-full h-auto p-6 bg-contentBg
       border border-zinc-800 rounded mt-5"
      >
        <div className="flex flex-wrap gap-4">
          <User />
          <Activity />
          <Threads />
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;

Profile.getLayout = (page: any) => <Layout>{page}</Layout>;
