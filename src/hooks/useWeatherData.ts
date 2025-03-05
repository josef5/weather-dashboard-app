import { useEffect, useState } from "react";
import { WeatherData } from "../types/weather";

export function useWeatherData(city: string) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&q=${city}&days=5&aqi=no&alerts=no`,
        );

        setWeatherData(await response.json());

        // console.log("weatherData :", weatherData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [city]);

  return { weatherData, loading, error };
}
