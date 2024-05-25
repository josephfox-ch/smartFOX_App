import React from "react";
import { Field, ErrorMessage, FormikProvider } from "formik";
import CountrySelect from "../lib-components/CountrySelect";
import TimeZoneSelect from "../lib-components/TimeZoneSelect";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

const EditHomeForm = ({ formik, handleGetCoordinates, handleSubmit }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-navyBlue dark:text-white">
            Home Information
          </h3>
          <button
            type="button"
            className="flex items-center bg-green-600 text-white p-2 text-sm shadow-lg hover:opacity-90"
            onClick={handleGetCoordinates}
          >
            <FaLocationDot size="18" className="mr-1" /> Get Coordinates
          </button>
        </div>
        <div className="flex items-start justify-end mt-1">
          <p className="deep-notes">
            For the correct coordinates, please use the location of the house.
          </p>
        </div>
      </div>

      <div className="p-7">
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit}>
            {/* Home Information Section */}
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="name"
                >
                  House Name
                </label>
                <Field
                  className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter house name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="streetAddress"
                >
                  Street Address
                </label>
                <Field
                  className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  placeholder="Enter street address"
                />
                <ErrorMessage
                  name="streetAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="city"
                >
                  City
                </label>
                <Field
                  className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter city"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <Field
                  className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Enter postal code"
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="latitude"
                >
                  Latitude
                </label>
                <Field
                  className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                  type="number"
                  id="latitude"
                  name="latitude"
                  placeholder="Enter latitude"
                />
                <ErrorMessage
                  name="latitude"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="longitude"
                >
                  Longitude
                </label>
                <Field
                  className="w-full border border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                  type="number"
                  id="longitude"
                  name="longitude"
                  placeholder="Enter longitude"
                />
                <ErrorMessage
                  name="longitude"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="country"
                >
                  Country
                </label>
                <Field name="country">
                  {({ field, form }) => (
                    <CountrySelect
                      value={field.value}
                      onChange={(option) =>
                        form.setFieldValue(
                          field.name,
                          option ? option.value : ""
                        )
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="timeZone"
                >
                  Time Zone
                </label>
                <Field name="timeZone">
                  {({ field, form }) => (
                    <TimeZoneSelect
                      value={field.value}
                      onChange={(option) =>
                        form.setFieldValue(
                          field.name,
                          option ? option.value : ""
                        )
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="timeZone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* Energy Certificate Section */}
            <h4 className="font-medium text-navyBlue dark:text-white mb-5 mt-10">
              Home Energy Certificate
            </h4>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="buildingVolume"
                >
                  Building Volume
                </label>
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
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="volumeOfHeatedZone"
                >
                  Volume of Heated Zone
                </label>
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
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="globalHeatLossCoefficient"
                >
                  Global Heat Loss Coefficient
                </label>
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
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="heatEmissionCoefficient"
                >
                  Heat Emission Coefficient
                </label>
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
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="freeHeatGains"
                >
                  Free Heat Gains
                </label>
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
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="constructionYear"
                >
                  Construction Year
                </label>
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
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="renewalDate"
                >
                  Renewal Date
                </label>
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

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
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
              >
                <FaRegSave size="15" /> Save
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default EditHomeForm;
