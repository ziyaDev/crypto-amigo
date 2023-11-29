"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import withAuth from "@/app/hoc/withAuth";

const ProfilePage = ({ user }: any) => {
  return (
    <DashboardLayout>
      <div>
        <h1>Profile</h1>
        <p>Name: {user?.name}</p>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(ProfilePage);
