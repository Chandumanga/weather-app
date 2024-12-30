import React from "react";

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      </div>
      <div className="flex items-center justify-center my3">
        <p>{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
