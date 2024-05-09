import React from "react";
import { useUser } from "../context/UserContext";
import userTwo from "../images/user/user-02.png";

const UserAvatar = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        <span className="text-sm text-gray-500">Loading...</span>
      </span>
    );
  }

  const avatarBaseUrl = `https://smartfoxhome.s3.eu-north-1.amazonaws.com/avatars/`

  return (
    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
      <img
        src={user ? `${avatarBaseUrl+user.id}.png` : userTwo}
        alt="User Avatar"
        className="h-full w-full object-cover"
        onError={(e) => {
          e.target.src = userTwo;
        }}
      />
    </span>
  );
};

export default UserAvatar;
