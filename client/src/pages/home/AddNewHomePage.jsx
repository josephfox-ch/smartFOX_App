import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import AddNewHomeForm from "../../components/forms/AddNewHomeForm";
import useHomeFormik from "../../hooks/useHomeFromik";
import { fetchCoordinates } from "../../utils/geoUtils";

const AddNewHomePage = () => {
  const formik = useHomeFormik();

  const getCoordinates = async () => {
    try {
      const { latitude, longitude } = await fetchCoordinates();
      formik.setFieldValue("latitude", latitude);
      formik.setFieldValue("longitude", longitude);
    } catch (error) {
      console.error("Failed to get coordinates:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="Add New Home" />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 dark:bg-gray-800">
        <div className="col-span-1 xl:col-span-5">
          <AddNewHomeForm handleGetCoordinates={getCoordinates} formik={formik} />
        </div>
      </div>
    </div>
  );
};

export default AddNewHomePage;

