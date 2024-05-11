import React from "react";
import { Field, ErrorMessage, FormikProvider } from "formik";
import CountrySelect from "../lib-components/CountrySelect";
import TimeZoneSelect from "../lib-components/TimeZoneSelect";

const AddNewHomeForm = ({ formik }) => {
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="houseName"
            >
              House Name
            </label>
            <Field
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              type="text"
              id="houseName"
              name="houseName"
              placeholder="Enter house name"
            />
            <ErrorMessage
              name="houseName"
              component="div"
              className="mt-1 text-red-500 text-sm"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="streetAddress"
            >
              Street Address
            </label>
            <Field
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              type="text"
              id="streetAddress"
              name="streetAddress"
              placeholder="Enter street address"
            />
            <ErrorMessage
              name="streetAddress"
              component="div"
              className="mt-1 text-red-500 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="city"
            >
              City
            </label>
            <Field
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              type="text"
              id="city"
              name="city"
              placeholder="Enter city"
            />
            <ErrorMessage
              name="city"
              component="div"
              className="mt-1 text-red-500 text-sm"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <Field
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Enter postal code"
            />
            <ErrorMessage
              name="postalCode"
              component="div"
              className="mt-1 text-red-500 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="country"
            >
              Country
            </label>
            <Field name="country">
              {({ field, form }) => (
                <CountrySelect
                  value={field.value}
                  onChange={(option) =>
                    form.setFieldValue(field.name, option ? option.value : "")
                  }
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              )}
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              className="mt-1 text-red-500 text-sm"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="timeZone"
            >
              Time Zone
            </label>
            <Field name="timeZone">
              {({ field, form }) => (
                <TimeZoneSelect
                  value={field.value}
                  onChange={(option) =>
                    form.setFieldValue(field.name, option.value)
                  }
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              )}
            </Field>
            <ErrorMessage
              name="timeZone"
              component="div"
              className="mt-1 text-red-500 text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            type="button"
            onClick={() => formik.resetForm()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default AddNewHomeForm;
