import React from "react";
import useCurrentTime from "../../hooks/useCurrentTime";

const TimeDisplay = () => {
  const currentTime = useCurrentTime();
  return (
    <div className="flex flex-col items-center text-bodydark1  p-1 mx-3 text-sm border border-graydark  ">
      {currentTime}
    </div>
  );
};

export default TimeDisplay;
