"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./common/LoadingSpinner";

const AppBar = () => {
  const router = useRouter();
  const { user, logout, isLoading }: any = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard/profile"}
      >
        DashBoard Profile
      </Link>
      <div className="flex gap-4 ml-auto items-center">
        {user ? (
          <button onClick={() => handleLogout()} className="text-green-600">
            Sign Out
          </button>
        ) : (
          <Link href={"/login"} className="text-green-600">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppBar;
