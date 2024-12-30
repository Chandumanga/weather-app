import React, { useState, useEffect } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty or undefined strings
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState({ q: "tokyo" });
  const [units, setUnits] = useState("metric");

  const getWeather = async () => {
    const message = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(message)} `);
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      console.log(data); // Log the data after it is fetched and set
    } catch (error) {
      toast.error("Failed to fetch weather data. Please try again.");
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3-hour Forecast" data={weather.hourly} />
          <Forecast title="Daily Forecast" data={weather.daily} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
