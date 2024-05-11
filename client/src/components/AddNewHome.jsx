import React from "react";
import { useFormik } from "formik";
import AddNewHomeForm from "./forms/AddNewHomeForm";
import Breadcrumb from "../components/Breadcrumb";
import * as Yup from "yup";

const AddNewHome = () => {
  const formik = useFormik({
    initialValues: {
      houseName: "",
      streetAddress: "",
      city: "",
      country: "CH",
      postalCode: "",
      timeZone: "Europe/Zurich",
    },
    validationSchema: Yup.object({
      houseName: Yup.string().required("House name is required"),
      streetAddress: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal code is required"),
      timeZone: Yup.string().required("Time zone is required"),
    }),
    onSubmit: (values) => {
      console.log("New-Home-Form-data:", values);
    },
  });

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="Add New Home" />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 dark:bg-gray-800">
        <div className="col-span-1 xl:col-span-5">
          <AddNewHomeForm formik={formik} />
        </div>
      </div>
    </div>
  );
};

export default AddNewHome;

