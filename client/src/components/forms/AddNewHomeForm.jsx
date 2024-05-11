import React from "react";
import { Field, ErrorMessage, FormikProvider } from "formik";
import CountrySelect from "../lib-components/CountrySelect";
import TimeZoneSelect from "../lib-components/TimeZoneSelect";

const AddNewHomeForm = ({ formik }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add New Home</h3>
      </div>
      <div className="p-7">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="houseName"
                >
                  House Name
                </label>
                <div className="relative">
                  <Field
                    className="w-full border  border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none  focus:border-indigo-500  dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
                    type="text"
                    id="houseName"
                    name="houseName"
                    placeholder="Enter house name"
                  />
                  <ErrorMessage
                    name="houseName"
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
                    className="w-full border  border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
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
                    className="w-full border  border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
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
                    className="w-full border   border-stroke bg-gray py-2 pl-4.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-darkinputborder dark:bg-darkinput dark:text-white"
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
            <div className="flex justify-end gap-4 mt-6">
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
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default AddNewHomeForm;
