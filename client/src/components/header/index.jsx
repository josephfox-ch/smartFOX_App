import React from 'react';
import { Link } from 'react-router-dom';
// import DropdownMessage from './DropdownMessage';
// import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-white shadow-md dark:bg-gray-800 dark:shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-3 md:px-6 2xl:px-11">
        {/* Hamburger Menu Button */}
        <div className="flex items-center gap-4">
          <button
            aria-controls="sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="block relative w-5 h-0.5 bg-black dark:bg-white"></span>
            <span className="block relative w-5 h-0.5 bg-black dark:bg-white mt-1.5"></span>
            <span className="block relative w-5 h-0.5 bg-black dark:bg-white mt-1.5"></span>
          </button>
          <Link to="/" className="hidden lg:block">
            <img src={LogoIcon} alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Search Form */}
        <div className="flex-grow">
          <form action="https://formbold.com/s/unique_form_id" method="POST" className="hidden sm:flex">
            <button type="submit" className="absolute mt-2 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type to search..."
              className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </form>
        </div>

        {/* User and Notifications Area */}
        <div className="flex items-center gap-4">
          <DarkModeSwitcher />
          {/* <DropdownNotification />
          <DropdownMessage /> */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
