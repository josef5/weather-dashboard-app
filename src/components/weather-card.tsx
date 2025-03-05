import React, { useEffect, useState } from "react";

function WeatherCard({ city }: { city: string }) {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${city}&days=5&aqi=no&alerts=no`,
      );

      setWeatherData(await response.json());

      console.log("weatherData :", weatherData);
    }

    fetchData();
  }, [city]);

  return (
    <div>
      {weatherData && (
        <div className="">
          <h2 className="font-bold">{weatherData.location.name}</h2>
          <p>{weatherData.location.country}</p>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt={weatherData.current.condition.text}
          />
          <p>{Math.round(weatherData.current.temp_c)}°C</p>
          <p>{weatherData.current.condition.text}</p>
          <div>
            <p className="">Humidity</p>
            <p className="font-semibold">{weatherData.current.humidity}%</p>
          </div>
          <div>
            <p className="">Wind Speed</p>
            <p className="font-semibold">{weatherData.current.wind_kph} km/h</p>
          </div>
          <div className="flex">
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="">
                <p className="">
                  {new Date(day.date).toLocaleDateString("en-GB", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className=""
                />
                <p className="">{Math.round(day.day.avgtemp_c)}°C</p>
              </div>
            ))}
          </div>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
