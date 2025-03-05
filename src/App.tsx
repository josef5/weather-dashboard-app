import { useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/weather-card";

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=London&days=5&aqi=no&alerts=no`,
      );

      setWeatherData(await response.json());

      console.log("weatherData :", weatherData);
    }

    fetchData();
  }, []);

  return (
    <>
      <WeatherCard data={weatherData}></WeatherCard>
    </>
  );
}

export default App;
