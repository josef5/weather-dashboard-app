import { Provider } from "react-redux";
import "./App.css";
import WeatherCard from "./components/weather-card";

function App() {
  return (
    <Provider store={store}>
        <WeatherCard city="London"></WeatherCard>
    </Provider>
  );
}

export default App;
