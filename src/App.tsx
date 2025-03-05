import { Provider, useSelector } from "react-redux";
import "./App.css";
import WeatherCard from "./components/weather-card";
import { RootState, store } from "./store/store";
import SearchBar from "./components/search-bar";

function AppContent() {
  const cities = useSelector((state: RootState) => state.weather.cities);

  // Sort the cities so that the pinned cities are shown first
  const sortedCities = [...cities].sort((a, b) => {
    if (a.pinned === b.pinned) {
      return 0;
    }
    return a.pinned ? -1 : 1;
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl">Weather Dashboard</h1>
      <SearchBar />
      <div className="flex flex-wrap gap-4">
        {sortedCities.length > 0 ? (
          sortedCities.map((city) => (
            <WeatherCard key={city.id} city={city.name} pinned={city.pinned} />
          ))
        ) : (
          <div>No cities added</div>
        )}
      </div>
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
