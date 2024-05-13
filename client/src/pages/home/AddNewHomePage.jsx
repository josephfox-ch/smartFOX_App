import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AddNewHomeForm from "../../components/forms/AddNewHomeForm";
import Breadcrumb from "../../components/Breadcrumb";
import * as Yup from "yup";
import { createHome } from "../../api/services/homeService";
import { useHomes } from "../../context/HomeContext";

const AddNewHomePage = () => {
  const navigate = useNavigate();
  const { homes, selectHome } = useHomes();

  const formik = useFormik({
    initialValues: {
      name: "",
      streetAddress: "",
      city: "",
      country: "CH",
      postalCode: "",
      timeZone: "Europe/Zurich",
      latitude:"",
      longitude:"",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("House name is required"),
      streetAddress: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal code is required"),
      timeZone: Yup.string().required("Time zone is required"),
      latitude:Yup.number().required("Latitude is required"),
      longitude:Yup.number().required("Longitude is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const newHome = await createHome(values);
        console.log("New home created:", newHome);
        resetForm();
        navigate("/dashboard/my-home");
        alert("Your new home created");
        //todo: show a success message
      } catch (error) {
        console.error("Error creating home:", error);
      } finally {
        setSubmitting(false);
      }
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

export default AddNewHomePage;
