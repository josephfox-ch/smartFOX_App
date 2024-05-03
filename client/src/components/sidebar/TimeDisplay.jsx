import React from "react";
import useCurrentTime from "../../hooks/useCurrentTime";

const TimeDisplay = () => {
  const currentTime = useCurrentTime();
  return (
    <div className="flex flex-col items-center text-bodydark1 mb-4 p-1 text-sm border border-gray-300 rounded-lg ">
      {currentTime}
    </div>
  );
};

export default TimeDisplay;
