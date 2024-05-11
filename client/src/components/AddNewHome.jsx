import React from 'react';
import { useFormik } from 'formik';
import { BsFillHouseAddFill } from 'react-icons/bs';
import AddNewHomeForm from './forms/AddNewHomeForm';
import * as Yup from 'yup';

const AddNewHome = () => {
  const formik = useFormik({
    initialValues: {
      houseName: '',
      streetAddress: '',
      city: '',
      country: 'CH',
      postalCode: '',
      timeZone: 'Europe/Zurich',
    },
    validationSchema: Yup.object({
      houseName: Yup.string().required('House name is required'),
      streetAddress: Yup.string().required('Street address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      postalCode: Yup.string().required('Postal code is required'),
      timeZone: Yup.string().required('Time zone is required'),
    }),
    onSubmit: (values) => {
      console.log('New-Home-Form-data:', values);
 
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col items-center mb-6 text-gray-700 dark:text-gray-300">
        <BsFillHouseAddFill size='80' className="cursor-pointer text-blue-500" />
        <h2 className="mt-3 text-3xl font-bold">Add New Home</h2>
      </div>
      <AddNewHomeForm formik={formik} />
    </div>
  );
};

export default AddNewHome;




