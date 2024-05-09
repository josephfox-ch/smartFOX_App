import React from "react";
import { LuUpload } from "react-icons/lu";
import userOne from "../../images/user/user-01.png";

function PhotoUploadForm() {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
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
                  <button className="text-sm hover:text-primary">Delete</button>
                  <button className="text-sm hover:text-primary">Update</button>
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
    </>
  );
}

export default PhotoUploadForm;
