import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchWeatherData } from "../store/weatherSlice";

export function useWeatherData(cityName: string) {
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector(
    (state: RootState) => state.weather.weatherData[cityName],
  );
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    if (!weatherData && cityName) {
      dispatch(fetchWeatherData(cityName));
    }
  }, [cityName, dispatch, weatherData]);

  return { weatherData, loading, error };
}
