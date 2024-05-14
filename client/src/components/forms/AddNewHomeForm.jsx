import React from "react";
import { Field, ErrorMessage, FormikProvider } from "formik";
import CountrySelect from "../lib-components/CountrySelect";
import TimeZoneSelect from "../lib-components/TimeZoneSelect";
import { FaLocationDot } from "react-icons/fa6";
import { ImWarning } from "react-icons/im";
import { FiArrowRightCircle } from "react-icons/fi";

const AddNewHomeForm = ({ handleGetCoordinates, formik, onContinue }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-black dark:text-white">
            Home Information
          </h3>
          <button
            type="button"
            className="flex items-center bg-green-600 text-white p-1 text-sm shadow-lg  border border-white hover:opacity-90"
            onClick={handleGetCoordinates}
          >
            <FaLocationDot size="20" className="mr-2" /> Get Coordinates
          </button>
        </div>
        <div className="flex items-start justify-end mt-1">
          <ImWarning className="text-red-600 mr-1" />
          <p className="deep-notes">
            For the correct coordinates, please use the location of the house.
          </p>
        </div>
      </div>

      <div className="p-7">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="name"
                >
                  House Name
                </label>
                <div className="relative">
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
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="streetAddress"
                >
                  Street Address
                </label>
                <div className="relative">
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
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="city"
                >
                  City
                </label>
                <div className="relative">
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
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <div className="relative">
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
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="latitude"
                >
                  Latitude
                </label>
                <div className="relative">
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
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="longitude"
                >
                  Longitude
                </label>
                <div className="relative">
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
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="country"
                >
                  Country
                </label>
                <div className="relative">
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
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="timeZone"
                >
                  Time Zone
                </label>
                <div className="relative">
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
            </div>
            <div className="flex items-start">
              <ImWarning className="mr-2 text-red-600" />
              <p className="deep-notes">
                Please provide a name, address, time zone, latitude and
                longitude for your home. This provides access to location-based
                functionality within SmartFOX® Home and ensures scheduled events
                occur at the correct time.
              </p>
            </div>
            <div className="flex items-start">
              <ImWarning className="mr-2 text-red-600" />
              <p className="deep-notes">
                By approving this form you consent to location information.
              </p>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button className="flex items-center gap-2 justify-center bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700 hover:shadow-lg" type="button" onClick={onContinue}>
                Continue <FiArrowRightCircle size="15" />
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default AddNewHomeForm;
