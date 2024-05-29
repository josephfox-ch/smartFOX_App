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
                  htmlFor="buildingArea"
                >
                  Building Area (m²)*
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="buildingArea"
                    name="buildingArea"
                    placeholder="Enter building area (m²)"
                  />
                  <ErrorMessage
                    name="buildingArea"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="insulationQuality"
                >
                  Insulation Quality*
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    id="insulationQuality"
                    name="insulationQuality"
                  >
                    <option value="" label="Select insulation quality" />
                    <option value="good" label="Good" />
                    <option value="average" label="Average" />
                    <option value="poor" label="Poor" />
                  </Field>
                  <ErrorMessage
                    name="insulationQuality"
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
                  htmlFor="wallArea"
                >
                  Wall Area (m²)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="wallArea"
                    name="wallArea"
                    placeholder="Enter wall area (m²)"
                  />
                  <ErrorMessage
                    name="wallArea"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="wallUValue"
                >
                  Wall U-Value (W/m²°C)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="wallUValue"
                    name="wallUValue"
                    placeholder="Enter wall U-value (W/m²°C)"
                  />
                  <ErrorMessage
                    name="wallUValue"
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
                  htmlFor="windowArea"
                >
                  Window Area (m²)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="windowArea"
                    name="windowArea"
                    placeholder="Enter window area (m²)"
                  />
                  <ErrorMessage
                    name="windowArea"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="windowUValue"
                >
                  Window U-Value (W/m²°C)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="windowUValue"
                    name="windowUValue"
                    placeholder="Enter window U-value (W/m²°C)"
                  />
                  <ErrorMessage
                    name="windowUValue"
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
                  htmlFor="boilerEfficiency"
                >
                  Boiler Efficiency (%)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="boilerEfficiency"
                    name="boilerEfficiency"
                    placeholder="Enter boiler efficiency (%)"
                  />
                  <ErrorMessage
                    name="boilerEfficiency"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="boilerCapacity"
                >
                  Boiler Capacity (kW)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="boilerCapacity"
                    name="boilerCapacity"
                    placeholder="Enter boiler capacity (kW)"
                  />
                  <ErrorMessage
                    name="boilerCapacity"
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
                  htmlFor="waterMass"
                >
                  Water Mass (kg)
                </label>
                <div className="relative">
                  <Field
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="number"
                    id="waterMass"
                    name="waterMass"
                    placeholder="Enter water mass (kg)"
                  />
                  <ErrorMessage
                    name="waterMass"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fuelType"
                >
                  Fuel Type
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    id="fuelType"
                    name="fuelType"
                  >
                    <option value="" label="Select fuel type" />
                    <option value="naturalGas" label="Natural Gas" />
                    <option value="electricity" label="Electricity" />
                    <option value="coal" label="Coal" />
                    <option value="oil" label="Oil" />
                  </Field>
                  <ErrorMessage
                    name="fuelType"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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
                  type="number"
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
