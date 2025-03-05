import { Provider, useSelector } from "react-redux";
import "./App.css";
import WeatherCard from "./components/weather-card";
import { RootState, store } from "./store/store";
import SearchBar from "./components/search-bar";

function AppContent() {
  const cities = useSelector((state: RootState) => state.weather.cities);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl">Weather Dashboard</h1>
      <SearchBar />
      {cities.map((city) => (
        <WeatherCard key={city.id} city={city.name} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppContent />
      </Provider>
    </div>
  );
}

export default App;
