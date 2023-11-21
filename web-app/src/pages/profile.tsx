import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  console.log(profile);
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
          {
            withCredentials: true,
          },
        );
        const user = res.data;
        setProfile(user);
      } catch (error: any) {
        console.error(
          "Error during login:",
          error.response?.data || error.message,
        );
        setError("Failed to load profile. Please log in again.");
      }
    };
    loadProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading user profile...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
    </div>
  );
};

export default Profile;
