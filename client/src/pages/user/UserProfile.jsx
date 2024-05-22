import React from "react";
import { useUser } from "../../context/UserContext";
import { useAccessControls } from "../../context/AccessControlContext";
import { useHomes } from "../../context/HomeContext";
import UserAvatar from "../../components/UserAvatar";
import Breadcrumb from "../../components/Breadcrumb";
import { FcHome } from "react-icons/fc";

const UserProfile = () => {
  const { user, loading: userLoading } = useUser();
  const { accessControls, loading: accessControlsLoading } =
    useAccessControls();
  const { homes, loading: homesLoading } = useHomes();

  console.log(accessControls);

  if (userLoading || accessControlsLoading || homesLoading)
    return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="My Profile" />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg  dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center mb-6">
          <div className="mr-6">
            <UserAvatar />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.email}</p>
            <p>{user.phoneNumber}</p>
            <p>{user.role}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Connected Homes</h2>
          {homes.length === 0 ? (
            <p className="">No homes connected.</p>
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
                  <p>
                    Address: {home.streetAddress}, {home.city}, {home.country}
                  </p>
                  <p>
                    Access level:{" "}
                    {accessControl ? accessControl.permissionLevel : "N/A"}
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
