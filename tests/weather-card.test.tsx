import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import WeatherCard from "../src/components/weather-card";
import weatherReducer from "../src/store/weatherSlice";
import { WeatherData } from "../src/types/weather";

test("WeatherCard renders correctly", () => {
  // Create a mock weather data that matches the WeatherData type
  const mockWeatherData: WeatherData = {
    current: {
      temp_c: 25,
      condition: {
        text: "Sunny",
        icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      },
      humidity: 60,
      wind_kph: 10,
    },
    location: {
      name: "New York",
      country: "United States",
    },
    forecast: {
      forecastday: [],
    },
  };

  // Create a store with the actual reducer
  const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
    preloadedState: {
      weather: {
        cities: [{ name: "New York", id: "new york", pinned: false }],
        weatherData: {
          "New York": mockWeatherData,
        },
        loading: false,
        error: null,
      },
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <WeatherCard city="New York" pinned={false} />
    </Provider>,
  );

  expect(getByText("New York")).toBeInTheDocument();
  expect(getByText("United States")).toBeInTheDocument();
  expect(getByText(/25/)).toBeInTheDocument();
});
