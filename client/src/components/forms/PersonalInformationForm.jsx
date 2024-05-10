import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useUser } from "../../context/UserContext";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, "Invalid phone number")
    .notRequired(),
});

const PersonalInformationForm = () => {
  const { user, updateUser } = useUser();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      password: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateUser(values);
        console.log("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Personal Information
        </h3>
      </div>
      <div className="p-7">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="firstName"
              >
                First Name
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-3">
                  <FaRegUser size="20" />
                </span>
                <input
                  className="w-full border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-3">
                  <FaRegUser size="20" />
                </span>
                <input
                  className="w-full border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-3">
                  <MdOutlineMail size="20" />
                </span>
                <input
                  className="w-full border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-3">
                  <RiLockPasswordFill size="20" />
                </span>
                <input
                  className="w-full border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="************"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mb-5.5">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              inputStyle={{ width: "100%", border: "1px solid #AEB7C0" }}
              country={"ch"}
              value={formik.values.phoneNumber}
              onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
              onBlur={formik.handleBlur}
              className="flex mt-1 block w-full rounded border-bodydark"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4.5">
            <button
              className="w-full sm:w-auto sm:flex-3 justify-center border border-stroke py-2 px-4 text-sm text-white bg-red-500 hover:shadow-1 hover:bg-red-600 dark:border-strokedark dark:text-white hover:shadow-lg"
              type="button"
              onClick={formik.resetForm}
            >
              Delete Account
            </button>
            <div className="flex justify-between gap-4.5">
              <button
                className="justify-center border border-stroke py-2 px-6 text-sm text-black hover:shadow-1 hover:bg-bodydark dark:border-strokedark dark:text-white hover:shadow-lg"
                type="button"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </button>
              <button
                className="justify-center bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700 hover:shadow-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
