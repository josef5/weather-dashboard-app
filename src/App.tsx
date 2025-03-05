import { Provider } from "react-redux";
import "./App.css";
import WeatherCard from "./components/weather-card";
import { store } from "./store/store";
import SearchBar from "./components/search-bar";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">Weather Dashboard</h1>
        <SearchBar />
        <WeatherCard city="London"></WeatherCard>
      </div>
    </Provider>
  );
}

export default App;
