import React from 'react';
import { Link } from 'react-router-dom';
import { PiPrinterFill } from "react-icons/pi";
import { ImFilePdf } from "react-icons/im";
import { RiDownload2Fill } from "react-icons/ri";

const productList = [
  {
    brand: 'Techno',
    description: 'Kemon 24 smart phone',
    quantity: 1,
    pricePerUnit: 200,
    total: 200,
  },
  {
    brand: 'Vivo',
    description: 'Vivo 32 smart phone',
    quantity: 3,
    pricePerUnit: 300,
    total: 900,
  },
  {
    brand: 'Samsung',
    description: 'S23 Ultra',
    quantity: 1,
    pricePerUnit: 1300,
    total: 1300,
  },
  {
    brand: 'Apple',
    description: 'iPhone 15Pro Max',
    quantity: 2,
    pricePerUnit: 1200,
    total: 2400,
  },
  {
    brand: 'Oppo',
    description: 'Fold X',
    quantity: 1,
    pricePerUnit: 900,
    total: 900,
  },
];

const Bill = () => {
  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-end gap-3.5">
        <button className="inline-flex items-center gap-2.5  bg-success px-2 py-[7px] font-medium text-white hover:bg-opacity-90">
        <PiPrinterFill size='18' />
          Print
        </button>

        <button className="inline-flex items-center gap-2.5  bg-primary px-2 py-[7px] font-medium text-white hover:bg-opacity-90">
        <ImFilePdf size='18'/>
          Save As PDF
        </button>
      </div>

      <div className="flex flex-wrap justify-between gap-5">
        <div>
        <div><img width='60' src="/SFX.png" alt="" /></div>
          <h4 className="mb-3 text-xl font-bold text-foxColor dark:text-white">
            SmartFOX® Home Systems
          </h4>
          <Link to="#" className="block underline text-blue-600">
            contact@smartfoxhome.ch
          </Link>
          <span className="mt-1.5 block">
            Rue de Dauphins,01  1217 Genève
          </span>
        </div>

        <div>
          <p className="mb-1.5 font-medium text-black dark:text-white">
            Billing To:
          </p>
          <h4 className="mb-3 text-xl font-bold text-black dark:text-white">
            John Doe
          </h4>
          <Link to="#" className="block">
            johndoe@example.com
          </Link>
          <span className="mt-1.5 block">
            New York, USA 2707 Davis Anenue
          </span>
        </div>
      </div>

      <div className="my-7.5 grid grid-cols-1 border border-stroke dark:border-strokedark xsm:grid-cols-2 sm:grid-cols-4">
        <div className="border-b border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark sm:border-b-0">
          <h5 className="mb-1.5 font-bold text-black dark:text-white">
            Invoice ID :
          </h5>
          <span className="text-sm font-medium"> #STK83084398239 </span>
        </div>

        <div className="border-b border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark sm:border-b-0 sm:border-r">
          <h5 className="mb-1.5 font-bold text-black dark:text-white">
            Date Issued :
          </h5>
          <span className="text-sm font-medium"> 29, Nov 2027 </span>
        </div>

        <div className="border-b border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark xsm:border-b-0">
          <h5 className="mb-1.5 font-bold text-black dark:text-white">
            Due Date :
          </h5>
          <span className="text-sm font-medium"> 29, Dec 2027 </span>
        </div>

        <div className="border-r border-stroke px-5 py-4 last:border-r-0 dark:border-strokedark">
          <h5 className="mb-1.5 font-bold text-black dark:text-white">
            Due Amount :
          </h5>
          <span className="text-sm font-medium"> $2,578.90 </span>
        </div>
      </div>

      <div className="border border-stroke dark:border-strokedark">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[670px]">
            {/* table header start */}
            <div className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark">
              <div className="col-span-3">
                <h5 className="font-medium text-black dark:text-white">
                  Brand name
                </h5>
              </div>

              <div className="col-span-4">
                <h5 className="font-medium text-black dark:text-white">
                  Description
                </h5>
              </div>

              <div className="col-span-2">
                <h5 className="font-medium text-black dark:text-white">
                  Quantity
                </h5>
              </div>

              <div className="col-span-2">
                <h5 className="font-medium text-black dark:text-white">
                  Price Per Unit
                </h5>
              </div>

              <div className="col-span-1">
                <h5 className="text-right font-medium text-black dark:text-white">
                  Total
                </h5>
              </div>
            </div>
            {/* table header end */}

            {productList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 border-b border-stroke py-3.5 pl-5 pr-6 dark:border-strokedark"
              >
                <div className="col-span-3">
                  <p className="font-medium">{item.brand}</p>
                </div>

                <div className="col-span-4">
                  <p className="font-medium">{item.description}</p>
                </div>

                <div className="col-span-2">
                  <p className="font-medium">{item.quantity}</p>
                </div>

                <div className="col-span-2">
                  <p className="font-medium">${item.pricePerUnit}</p>
                </div>

                <div className="col-span-1">
                  <p className="text-right font-medium">${item.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* total price start */}
        <div className="flex justify-end p-6">
          <div className="max-w-65 w-full">
            <div className="flex flex-col gap-4">
              <p className="flex justify-between font-medium text-black dark:text-white">
                <span> Subtotal </span>
                <span> $4700 </span>
              </p>

              <p className="flex justify-between font-medium text-black dark:text-white">
                <span> Shipping Cost (+) </span>
                <span> $10.00 </span>
              </p>

              <p className="flex justify-between font-medium text-black dark:text-white">
                <span>
                  Coupon Discount
                  <span className="text-success">(10%)</span>
                </span>
                <span> $470 </span>
              </p>

              <p className="flex justify-between font-medium text-black dark:text-white">
                <span>
                  Vat <span className="text-red">(5%)</span>
                </span>
                <span> $235 </span>
              </p>
            </div>

            <p className="mt-4 flex justify-between border-t border-stroke pt-5 dark:border-strokedark">
              <span className="font-medium text-black dark:text-white">
                Total
              </span>
              <span className="font-bold text-success"> $4475 </span>
            </p>

            <button className="float-right mt-10 inline-flex items-center gap-2.5  bg-primary px-3 py-2 font-medium text-white hover:bg-opacity-90">
            <RiDownload2Fill size='18' />
              Download
              
            </button>
          </div>
        </div>
        {/* total price end */}
      </div>
    </div>
  );
}

export default Bill;

