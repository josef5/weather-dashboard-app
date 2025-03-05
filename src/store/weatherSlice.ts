import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${city}&days=5&aqi=no&alerts=no`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return response.json();
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData[action.meta.arg] = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather data";
      });
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
