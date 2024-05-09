import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useUser } from "../../context/UserContext";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function PersonalInformationForm() {
  const { user } = useUser();
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Personal Information
        </h3>
      </div>
      <div className="p-7">
        <form action="#">
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
                  className="w-full  border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white "
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Your First Name"
                  defaultValue={user ? `${user.firstName}` : ""}
                />
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
                  className="w-full  border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Your Last Name"
                  defaultValue={user ? `${user.lastName}` : ""}
                />
              </div>
            </div>
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-3">
                  <MdOutlineMail size="20" />
                </span>
                <input
                  className="w-full  border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white "
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  placeholder="email@example.com"
                  defaultValue={user ? `${user.email} ` : ""}
                />
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
                  className="w-full  border border-stroke bg-gray py-2  pl-11.5 pr-4.5  text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 dark:border-strokedark dark:bg-meta-4 dark:text-white"
                  type="text"
                  name="password"
                  id="password"
                  placeholder="************"
                  defaultValue=""
                />
              </div>
            </div>
          </div>

          <div className="mb-5.5">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              inputStyle={{ width: "100%", border: "1px solid #AEB7C0" }}
              country={"ch"}
              value={user ? `${user.phoneNumber} ` : ""}
              onChange={() => {}}
              className="flex mt-1 block w-full  rounded  border-bodydark "
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4.5">
            <button
              className="w-full sm:w-auto sm:flex-3 justify-center border border-stroke py-2 px-4 text-sm text-white bg-red-500 hover:shadow-1 hover:bg-red-600 dark:border-strokedark dark:text-white"
              type="button"
            >
              Delete Account
            </button>
            <div className="flex justify-between gap-4.5">
              <button
                className="  justify-center border border-stroke py-2 px-6 text-sm text-black hover:shadow-1 hover:bg-bodydark dark:border-strokedark dark:text-white"
                type="button"
              >
                Cancel
              </button>
              <button
                className="  justify-center bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700"
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
}

export default PersonalInformationForm;

