import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import AddNewHomeForm from "../../components/forms/AddNewHomeForm";
import EnergyCertificateForm from "../../components/forms/EnergyCertificateForm";
import useHomeFormik from "../../hooks/useHomeFormik";
import { fetchCoordinates } from "../../utils/geoUtils";
import { useAlert } from "../../context/AlertContext";

const HomeFormsInfoPage = () => {
  const [showEnergyCertificateForm, setShowEnergyCertificateForm] = useState(false);
  const formik = useHomeFormik();
  const { showAlert } = useAlert();

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

  const handleContinue = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length !== 0) {
      formik.setTouched({
        name: true,
        streetAddress: true,
        city: true,
        country: true,
        postalCode: true,
        timeZone: true,
        latitude: true,
        longitude: true,
      });
      showAlert(
        "error",
        "Validation Error",
        "Please fill out all required fields in the Home Information form."
      );
      return;
    }
    setShowEnergyCertificateForm(true);
  };

  const handleBack = () => {
    setShowEnergyCertificateForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length !== 0) {
      showAlert(
        "error",
        "Error",
        "Please fill out all required fields in the Home Information form."
      );
      return;
    }
    formik.handleSubmit();
    showAlert("success", "Success", "Form submitted successfully.");
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="Add New Home" />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 dark:bg-gray-800">
        {!showEnergyCertificateForm ? (
          <div className="col-span-1 xl:col-span-5">
            <AddNewHomeForm
              handleGetCoordinates={getCoordinates}
              formik={formik}
              onContinue={handleContinue}
            />
          </div>
        ) : (
          <div className="col-span-1 xl:col-span-5">
            <EnergyCertificateForm
              formik={formik}
              onBack={handleBack}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFormsInfoPage;

