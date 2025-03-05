import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, WeatherData } from "../types/weather";

interface WeatherState {
  cities: City[];
  weatherData: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
}

const storedCities = getStoredCities();

const initialState: WeatherState = {
  cities: storedCities,
  weatherData: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      // Check if the city is already in the list
      if (!state.cities.find((city) => city.name === action.payload.name)) {
        state.cities.push(action.payload);

        setStoredCities(state.cities);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(
        (city) => city.name !== action.payload,
      );
      delete state.weatherData[action.payload];

      setStoredCities(state.cities);
    },
    togglePinned: (state, action: PayloadAction<string>) => {
      const city = state.cities.find((city) => city.name === action.payload);
      if (city) {
        city.pinned = !city.pinned;

        setStoredCities(state.cities);
      }
    },
  },
});

function getStoredCities() {
  return JSON.parse(localStorage.getItem("cities") ?? "[]") as City[];
}

function setStoredCities(data: City[]) {
  localStorage.setItem("cities", JSON.stringify(data));
}

export const { addCity, removeCity, togglePinned } = weatherSlice.actions;
export default weatherSlice.reducer;
