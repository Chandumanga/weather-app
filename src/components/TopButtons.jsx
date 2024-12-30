import React from "react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Paris",
    },
    {
      id: 3,
      name: "Toronto",
    },
    {
      id: 4,
      name: "USA",
    },
    {
      id: 5,
      name: "Sydney",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city, index) => (
        <button
          key={index}
          className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in "
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
