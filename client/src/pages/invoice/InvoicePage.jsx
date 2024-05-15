import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Bill from "./Bill";


const InvoicePage = () => {
  return (
    <>
      <Breadcrumb pageName="Invoice" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-4 py-4 dark:border-strokedark sm:px-6 xl:px-9">
            <h3 className="font-medium text-black dark:text-white">June,2024</h3>
          </div>

          <div className="p-4 sm:p-6 xl:p-9">
            <Bill />
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
