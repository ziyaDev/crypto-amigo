import { useEffect, useState } from "react";
// import { fetchProfile } from "../../utils/api";

const Profile = () => {
  // const [profile, setProfile] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem("token"); // Adjust based on your token storage
    // fetchProfile(token).then((data) => setProfile(data));
  }, []);

  // if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: asdasdsadsd!!!</p>
      <p>Email: asds</p>
      {/* Render other profile data */}
    </div>
  );
};

export default Profile;
