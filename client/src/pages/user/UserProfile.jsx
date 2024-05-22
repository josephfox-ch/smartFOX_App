import React from "react";
import { useUser } from "../../context/UserContext";
import { useAccessControls } from "../../context/AccessControlContext";
import { useHomes } from "../../context/HomeContext";
import UserAvatar from "../../components/UserAvatar";
import Breadcrumb from "../../components/Breadcrumb";
import { FcHome } from "react-icons/fc";

const UserProfile = () => {
  const { user, loading: userLoading } = useUser();
  const {
    accessControls,
    loading: accessControlsLoading,
  } = useAccessControls();
  const { homes, loading: homesLoading } = useHomes();

  console.log(accessControls);

  if (userLoading || accessControlsLoading || homesLoading)
    return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="My Profile" />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center mb-6">
          <div className="mr-6">
            <UserAvatar />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phoneNumber}</p>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Connected Homes</h2>
          {homes.length === 0 ? (
            <p className="text-gray-600">No homes connected.</p>
          ) : (
            homes.map((home) => {
              const accessControl = accessControls.find(
                (ac) => ac.homeId === home.id
              );
              return (
                <div
                  key={home.id}
                  className="border border-gray-300 p-4 mb-4 rounded"
                >
                  <div className=" items-end gap-1">
                    <FcHome size="30" />
                    <h3 className="text-lg font-semibold ">{home.name}</h3>
                  </div>
                  <p className="text-gray-600">
                    Address: {home.streetAddress}, {home.city}, {home.country}
                  </p>
                  <p className="text-gray-600">
                    Access level: {accessControl ? accessControl.permissionLevel : "N/A"}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
