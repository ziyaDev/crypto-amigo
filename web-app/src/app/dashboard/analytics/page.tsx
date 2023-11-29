"use client";

import DashboardLayout from "@/components/common/DashboardLayout";
import withAuth from "@/app/hoc/withAuth";

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div>
        <h1>Analytics page</h1>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(AnalyticsPage);
