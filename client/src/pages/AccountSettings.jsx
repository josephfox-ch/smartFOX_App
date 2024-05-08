import Breadcrumb from "../components/Breadcrumb";
import { useUser } from "../context/UserContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
import userOne from "../images/user/user-01.png";

const AccountSettings = () => {
  const { user } = useUser();
  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb className="text-foxColor" pageName="Account Settings" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
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
                      htmlFor="phoneNumber"
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
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Your Photo
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full">
                    <img src={userOne} alt="User" />
                  </div>
                  <div>
                    <span className="mb-1.5 text-black dark:text-white">
                      Edit your photo
                    </span>
                    <span className="flex gap-2.5">
                      <button className="text-sm hover:text-primary">
                        Delete
                      </button>
                      <button className="text-sm hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-bodydark">
                      <LuUpload className="text-primary " size="18" />
                    </span>
                    <p>
                      <span className="text-primary dark:text-linkColor">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div>

                <div className="flex justify-end  gap-4.5">
                  <button
                    className="flex justify-center  border border-stroke py-2 px-6 text-sm text-black hover:shadow-1 hover:bg-bodydark dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center  bg-blue-600 py-2 px-6 text-sm text-white hover:bg-blue-700"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
