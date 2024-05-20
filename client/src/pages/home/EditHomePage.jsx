import React, { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import EditHomeForm from "../../components/forms/EditHomeForm";
import useEditHomeFormik from "../../hooks/useEditHomeFormik";
import { fetchCoordinates } from "../../utils/geoUtils";
import { useAlert } from "../../context/AlertContext";
import { useHomes } from "../../context/HomeContext";

const EditHomePage = () => {
  const { fetchHomeDetails, selectedHome } = useHomes();
  const homeId = selectedHome?.id;

  const formik = useEditHomeFormik(homeId);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchHomeDetails(homeId);
  }, [homeId]);

  const getCoordinates = async () => {
    try {
      const { latitude, longitude } = await fetchCoordinates();
      formik.setFieldValue("latitude", latitude);
      formik.setFieldValue("longitude", longitude);
    } catch (error) {
      console.error("Failed to get coordinates:", error);
      showAlert("error", "Error", "Failed to get coordinates.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length !== 0) {
      showAlert(
        "error",
        "ValhomeIdation Error",
        "Please fill out all required fields."
      );
      return;
    }
    formik.handleSubmit();
    showAlert("success", "Success", "Form submitted successfully.");
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="Edit Home" />
      <div className="grhomeId grhomeId-cols-1 xl:grhomeId-cols-5 gap-8 dark:bg-gray-800">
        <div className="col-span-1 xl:col-span-5">
          <EditHomeForm
            handleGetCoordinates={getCoordinates}
            formik={formik}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditHomePage;
