import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import AddNewHomeForm from "../../components/forms/AddNewHomeForm";
import EnergyCertificateForm from "../../components/forms/EnergyCertificateForm";
import useHomeFormik from "../../hooks/useHomeFormik";
import { fetchCoordinates } from "../../utils/geoUtils";

const HomeFormsInfoPage = () => {
  const [showEnergyCertificateForm, setShowEnergyCertificateForm] = useState(false);
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

  const handleContinue = () => {
    setShowEnergyCertificateForm(true);
  };

  const handleBack = () => {
    setShowEnergyCertificateForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length !== 0) {
      alert("Please fill out all required fields in the Home Information form.");
      formik.setErrors(errors);
      return;
    }
    formik.handleSubmit();
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
            <EnergyCertificateForm formik={formik} onBack={handleBack} handleSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFormsInfoPage;








