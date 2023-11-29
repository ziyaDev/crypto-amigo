import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const withAuth = (WrappedComponent: any) => {
  const WithAuthHOC: any = (props: any) => {
    const { user, isLoading }: any = useAuth();
    const router = useRouter();

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  return WithAuthHOC;
};

export default withAuth;
