import React from "react";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-1/5 bg-white p-4">
        <nav>
          <ul>
            <li className="text-xl mb-4 font-bold">Dashboard</li>
            <li className="mb-2">
              <a
                href="/dashboard/profile"
                className="text-gray-700 hover:text-gray-900"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/dashboard/analytics"
                className="text-gray-700 hover:text-gray-900"
              >
                Analytics
              </a>
            </li>
            {/* Add more navigation items here */}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
