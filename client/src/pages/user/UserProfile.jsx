import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useAccessControls } from "../../context/AccessControlContext";
import { useHomes } from "../../context/HomeContext";
import UserAvatar from "../../components/UserAvatar";
import Breadcrumb from "../../components/Breadcrumb";
import { FcHome } from "react-icons/fc";
import { FaMapMarkerAlt, FaKey } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfile = () => {
  const { user, loading: userLoading } = useUser();
  const { accessControls, loading: accessControlsLoading } = useAccessControls();
  const { homes, selectedHome, selectHome, loading: homesLoading } = useHomes();
  const [selectedHomeId, setSelectedHomeId] = useState(null);

  useEffect(() => {
    if (selectedHome) {
      setSelectedHomeId(selectedHome.id);
    }
  }, [selectedHome]);

  const handleHomeClick = (home) => {
    selectHome(home.id);
    setSelectedHomeId(home.id);
  };

  const renderLoadingSkeleton = () => (
    <div className="mx-auto max-w-7xl p-6">
      <Skeleton height={40} width={300} />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg dark:border-strokedark dark:bg-boxdark mt-4">
        <div className="flex items-center mb-6">
          <div className="mr-6">
            <Skeleton circle height={60} width={60} />
          </div>
          <div>
            <Skeleton height={30} width={200} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4"><Skeleton width={200} /></h2>
        <Skeleton height={150} />
      </div>
    </div>
  );

  if (userLoading || accessControlsLoading || homesLoading) {
    return renderLoadingSkeleton();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="My Profile" />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
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
            <p>No homes connected.</p>
          ) : (
            homes.map((home) => {
              const accessControl = accessControls.find((ac) => ac.homeId === home.id);
              return (
                <div
                  key={home.id}
                  className="relative border border-gray-300 p-4 mb-5 rounded cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleHomeClick(home)}
                >
                  <div className="flex items-center">
                    <FcHome size="30" />
                    {selectedHomeId === home.id && (
                      <FaMapMarkerAlt
                        className="inline-block ml-2 text-blue-600 animate-ping"
                        size="18"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{home.name}</h3>
                  </div>
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    {home.streetAddress}, {home.city}, {home.country}
                  </p>
                  <p className="flex items-center">
                    <FaKey className="mr-2" />
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


