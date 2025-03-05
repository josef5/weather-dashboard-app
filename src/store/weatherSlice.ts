import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, WeatherData } from "../types/weather";

interface WeatherState {
  cities: City[];
  weatherData: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [{ name: "London", id: "london", pinned: false }],
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
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(
        (city) => city.name !== action.payload,
      );
      delete state.weatherData[action.payload];
    },
    togglePinned: (state, action: PayloadAction<string>) => {
      const city = state.cities.find((city) => city.name === action.payload);
      if (city) {
        city.pinned = !city.pinned;
      }
    },
  },
});

export const { addCity, removeCity, togglePinned } = weatherSlice.actions;
export default weatherSlice.reducer;
