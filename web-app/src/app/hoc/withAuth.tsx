import React from "react";
import { useAuth } from "@/contexts/authContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: any) => {
  const WithAuthHOC: any = (props: any) => {
    const { user, isLoading,isAuthenticated } = useAuth();

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      redirect("/login"); // notice that redirect function returns never 
    }

    return <WrappedComponent {...props} user={user} />;
  };

  return WithAuthHOC;
};

export default withAuth;
