import Link from "next/link";
import React from "react";

const AppBar = () => {
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
        <Link href={"/login"} className="flex gap-4 ml-auto text-green-600">
          Sign In
        </Link>
        {/* <Link
          href={"/signin"}
          className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
        >
          Sign Up
        </Link> */}
      </div>
    </header>
  );
};

export default AppBar;
