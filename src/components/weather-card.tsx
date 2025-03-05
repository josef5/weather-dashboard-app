import { Pin, X } from "lucide-react";
import { useWeatherData } from "../hooks/useWeatherData";
import { useDispatch } from "react-redux";
import { removeCity, togglePinned } from "../store/weatherSlice";

function WeatherCard({ city, pinned }: { city: string; pinned: boolean }) {
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useWeatherData(city);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {weatherData && (
        <div className="relative flex w-fit flex-col gap-1 rounded-md border border-gray-600 p-4">
          <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
          <p>{weatherData.location.country}</p>
          <div className="flex items-center">
            <img
              src={`https:${weatherData.current.condition.icon}`}
              alt={weatherData.current.condition.text}
            />
            <p className="text-5xl font-bold">
              {Math.round(weatherData.current.temp_c)}°C
            </p>
            {/* <p>{weatherData.current.condition.text}</p> */}
          </div>
          <div className="absolute top-2 right-2 flex gap-0.5">
            <button
              onClick={() => dispatch(togglePinned(city))}
              className={`cursor-pointer hover:text-gray-600 ${pinned ? "text-blue-500" : "text-gray-500"}`}
            >
              <Pin className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch(removeCity(city))}
              className="cursor-pointer text-gray-500 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <div>
              <p className="text-xs">Humidity</p>
              <p className="font-semibold">{weatherData.current.humidity}%</p>
            </div>
            <div>
              <p className="text-xs">Wind Speed</p>
              <p className="font-semibold">
                {weatherData.current.wind_kph} km/h
              </p>
            </div>
          </div>
          <hr className="my-2 text-gray-600" />
          {/* <div className="mt-4 text-xs">Five day forecast</div> */}
          <div className="flex">
            {weatherData.forecast.forecastday.map((day) => (
              <div key={day.date} className="flex flex-col items-center">
                <p className="text-xs">
                  {new Date(day.date).toLocaleDateString("en-GB", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="mx-auto h-8 w-8"
                />
                <p className="text-xs">{Math.round(day.day.avgtemp_c)}°C</p>
              </div>
            ))}
          </div>
          {/* <pre>{JSON.stringify(weatherData, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
