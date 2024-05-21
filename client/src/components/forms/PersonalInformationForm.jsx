import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill, RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import usePersonalInfoFormik from "../../hooks/usePersonalInfoFormik";
import { useModal } from "../../context/ModalContext";
import DynamicModal from "../modals/DynamicModal";

const PersonalInformationForm = () => {
  const { openModal, closeModal } = useModal();
  const { formik, deleteAccount } = usePersonalInfoFormik();

  const handleDeleteAccount = () => {
    openModal({
      title: "Delete Account",
      content: "Are you sure you want to delete your account?",
      onConfirmAction: deleteAccount,
      onCancelAction: closeModal,
    });
  };

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
              className="w-full flex items-center justify-center gap-2 sm:w-auto sm:flex-3 justify-center border border-stroke py-2 px-4 text-sm text-white bg-red-500 hover:shadow-1 hover:bg-red-600 dark:border-strokedark dark:text-white hover:shadow-lg"
              type="button"
              onClick={handleDeleteAccount}
            >
              <RiDeleteBin5Fill size='15'/> Delete Account
            </button>
            <div className="flex justify-between gap-4.5">
              <button
                className="flex items-center gap-2 justify-center border border-stroke py-2 px-6 text-sm text-black hover:shadow-1 hover:bg-gray-300 dark:border-strokedark dark:text-white hover:shadow-lg"
                type="button"
                onClick={() => formik.resetForm()}
              >
                <MdOutlineCancel size="15" /> Cancel
              </button>
              <button
                className="flex items-center gap-2 justify-center bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700 hover:shadow-lg"
                type="submit"
              >
                <FaRegSave size="15" /> Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <DynamicModal />
    </div>
  );
};

export default PersonalInformationForm;




