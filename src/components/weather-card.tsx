import React from "react";

function WeatherCard(data: any) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default WeatherCard;
