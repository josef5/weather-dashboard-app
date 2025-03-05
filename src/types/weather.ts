export interface City {
  id: string;
  name: string;
}

export interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
}
