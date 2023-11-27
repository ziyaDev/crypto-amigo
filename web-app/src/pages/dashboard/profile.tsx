import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import DashboardLayout from "@/components/common/DashboardLayout";

interface UserProfile {
  name: string;
  // Include other user attributes as needed
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
          {
            withCredentials: true,
          },
        );
        const user = res.data;
        setProfile(user);
        setIsLoading(false);
      } catch (error: any) {
        console.error(
          "Error trying to get profile:",
          error.response?.data || error.message,
        );

        setError("Failed to load profile. Please log in again.");
        Router.push("/login");
      }
    };

    loadProfile();
  }, []);

  if (isLoading || !profile) return <LoadingSpinner />;

  return (
    <DashboardLayout>
      <div>
        <h1>Profile</h1>
        <p>Name: {profile.name}</p>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
