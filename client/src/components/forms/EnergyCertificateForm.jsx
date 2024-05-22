import React from "react";
import { Field, ErrorMessage, FormikProvider } from "formik";
import { FiArrowLeftCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

const EnergyCertificateForm = ({ formik, onBack, handleSubmit }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-black dark:text-white">
            Home Energy Certificate
          </h3>
        </div>
      </div>

      <div className="p-7">
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="buildingVolume"
                >
                  Building Volume
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="buildingVolume"
                    name="buildingVolume"
                    placeholder="Enter building volume"
                  />
                  <ErrorMessage
                    name="buildingVolume"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="volumeOfHeatedZone"
                >
                  Volume of Heated Zone
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="volumeOfHeatedZone"
                    name="volumeOfHeatedZone"
                    placeholder="Enter volume of heated zone"
                  />
                  <ErrorMessage
                    name="volumeOfHeatedZone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="globalHeatLossCoefficient"
                >
                  Global Heat Loss Coefficient
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="globalHeatLossCoefficient"
                    name="globalHeatLossCoefficient"
                    placeholder="Enter global heat loss coefficient"
                  />
                  <ErrorMessage
                    name="globalHeatLossCoefficient"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="heatEmissionCoefficient"
                >
                  Heat Emission Coefficient
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="heatEmissionCoefficient"
                    name="heatEmissionCoefficient"
                    placeholder="Enter heat emission coefficient"
                  />
                  <ErrorMessage
                    name="heatEmissionCoefficient"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="freeHeatGains"
                >
                  Free Heat Gains
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="freeHeatGains"
                    name="freeHeatGains"
                    placeholder="Enter free heat gains"
                  />
                  <ErrorMessage
                    name="freeHeatGains"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="constructionYear"
                >
                  Construction Year
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="year"
                    id="constructionYear"
                    name="constructionYear"
                    placeholder="Enter construction year"
                  />
                  <ErrorMessage
                    name="constructionYear"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="renewalDate"
                >
                  Renewal Date
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="date"
                    id="renewalDate"
                    name="renewalDate"
                    placeholder="Enter renewal date"
                  />
                  <ErrorMessage
                    name="renewalDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <div>
                <button
                  className="flex items-center gap-2 justify-center border border-stroke py-2 px-6 text-sm text-white hover:shadow-1 bg-foxColor hover:bg-foxColorHover dark:border-strokedark  hover:shadow-lg"
                  type="button"
                  onClick={onBack}
                >
                  <FiArrowLeftCircle size="15" /> Back
                </button>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="flex items-center gap-2 justify-center border border-stroke py-2 px-6 text-sm text-black hover:shadow-1 hover:bg-bodydark dark:border-strokedark dark:text-white hover:shadow-lg"
                  type="button"
                  onClick={() => formik.resetForm()}
                >
                  <MdOutlineCancel size="15" /> Cancel
                </button>
                <button
                  className="flex items-center gap-2 justify-center bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700 hover:shadow-lg"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FaRegSave size="15" /> Save
                </button>
              </div>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EnergyCertificateForm;
