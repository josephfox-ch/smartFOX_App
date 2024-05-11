import React from "react";
import { useHomes } from "../../context/HomeContext";
import Breadcrumb from "../../components/Breadcrumb";

const MyHomePage = () => {
  const { homes, selectedHome, loading, error } = useHomes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="My Home" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {selectedHome ? (
          <table className="min-w-full bg-white  dark:border-strokedark dark:bg-boxdark shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Property</th>
                <th className="py-3 px-6 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  House Name
                </td>
                <td className="py-3 px-6 text-left">
                  {selectedHome.houseName}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Address
                </td>
                <td className="py-3 px-6 text-left">
                  {selectedHome.streetAddress}, {selectedHome.city},{" "}
                  {selectedHome.country}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Postal Code
                </td>
                <td className="py-3 px-6 text-left">
                  {selectedHome.postalCode}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Time Zone
                </td>
                <td className="py-3 px-6 text-left">{selectedHome.timeZone}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Smart System Active
                </td>
                <td className="py-3 px-6 text-left">
                  {selectedHome.isActive ? "Yes" : "No"}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Smart System Start Date
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(
                    selectedHome.smartSystemStartDate
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Smart System End Date
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(
                    selectedHome.smartSystemEndDate
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Created At
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(selectedHome.createdAt).toLocaleDateString()}
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                  Updated At
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(selectedHome.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            </tbody>
          </table>
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
