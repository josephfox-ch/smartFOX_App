import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TabMenu = ({ rooms, activeTab, onTabClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(rooms.indexOf(activeTab));
  }, [activeTab, rooms]);

  const handleNext = () => {
    if (currentIndex < rooms.length - 1) {
      onTabClick(rooms[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onTabClick(rooms[currentIndex - 1]);
    }
  };

  return (
    <div className="mb-6 flex items-center justify-center">
      {isMobile && (
        <button
          onClick={handlePrev}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>
      )}
      <div className={`flex ${isMobile ? 'overflow-hidden w-full justify-center' : 'space-x-4'}`}>
        <ul className={`flex ${isMobile ? 'transition-transform duration-300' : ''}`} style={isMobile ? { transform: `translateX(-${currentIndex * 100}%)` } : {}}>
          {rooms.map((room, index) => (
            <li
              key={room}
              className={`whitespace-nowrap mx-2 px-4 py-2 cursor-pointer ${activeTab === room ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-400"}`}
              style={{ minWidth: isMobile ? "100%" : "auto", textAlign: "center" }}
              onClick={() => onTabClick(room)}
            >
              {room}
            </li>
          ))}
        </ul>
      </div>
      {isMobile && (
        <button
          onClick={handleNext}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
          disabled={currentIndex === rooms.length - 1}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default TabMenu;


