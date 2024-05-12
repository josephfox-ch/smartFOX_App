import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/illustration-01.svg" alt="illustration" />

        <div className="mt-7.5 text-center">
          <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
            Sorry, the page can’t be found
          </h2>
          <p className="font-medium">
            The page you were looking for appears to have been moved, deleted or
            does not exist.
          </p>
          <Link
            to="/"
            className="mt-7.5 inline-flex items-center gap-2  bg-foxColor py-2 px-4  text-white hover:bg-opacity-90"
          >
            <FaArrowLeft className="mr-3" size="18" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
