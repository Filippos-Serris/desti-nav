import { Fragment, useState } from "react";

import "../../assets/stylesheets/Weather/WeatherResultsList.css";

import WeatherResult from "./WeatherResult";

const WeatherResultsList = (props) => {
  const { weatherConditions } = props;

  return (
    <div className="weather-result-list-container">
      <ul className="weather-result-list">
        {weatherConditions.map((data) => (
          <WeatherResult key={data.id} weather={data} />
        ))}
      </ul>
    </div>
  );
};

export default WeatherResultsList;
