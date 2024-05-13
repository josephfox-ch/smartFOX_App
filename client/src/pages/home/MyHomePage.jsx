import React from "react";
import { useHomes } from "../../context/HomeContext";
import Breadcrumb from "../../components/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyHomePage = () => {
  const { homes, selectedHome, loading, error } = useHomes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <Breadcrumb className="text-foxColor" pageName="My Home" />
      <div className="rounded-sm border border-stroke bg-white shadow-lg p-6 dark:border-strokedark dark:bg-boxdark">
        {selectedHome ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {selectedHome.name}
              </h2>
              <div className="flex space-x-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  <FaEdit /> Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
                <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
                  Property Details
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Address:</strong> {selectedHome.streetAddress},{" "}
                  {selectedHome.city}, {selectedHome.country}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Postal Code:</strong> {selectedHome.postalCode}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Time Zone:</strong> {selectedHome.timeZone}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Smart System Active:</strong>{" "}
                  {selectedHome.isActive ? "Yes" : "No"}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Smart System Start Date:</strong>{" "}
                  {new Date(
                    selectedHome.smartSystemStartDate
                  ).toLocaleDateString()}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Smart System End Date:</strong>{" "}
                  {new Date(
                    selectedHome.smartSystemEndDate
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
                <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
                  Energy Certification
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Certification Level:</strong>A2
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Issued Date:</strong> 23.05.2022
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Expiry Date:</strong>27.05.2026
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
                <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
                  Climate Control
                </h3>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
                <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
                  Lighting Control
                </h3>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow dark:bg-gray-800">
                <h3 className="font-medium text-lg mb-3 text-gray-700 dark:text-gray-300">
                  Additional Information
                </h3>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">
            Please select a home to view details.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyHomePage;
