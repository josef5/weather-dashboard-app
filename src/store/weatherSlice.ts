import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, WeatherData } from "../types/weather";

interface WeatherState {
  cities: City[];
  weatherData: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      if (!state.cities.find((city) => city.name === action.payload.name)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      delete state.weatherData[action.payload];
    },
  },
});

export const { addCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
