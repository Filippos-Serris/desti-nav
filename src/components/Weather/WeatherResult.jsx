import { useState } from "react";
import "../../assets/stylesheets/Weather/WeatherResult.css";

const WeatherResult = (props) => {
  const { date, min, apparentMin, max, apparentMax, code } = props.weather;

  const averageTemp = (min + max) / 2;
  const avgFeelTemp = (apparentMin + apparentMax) / 2;

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let month = months[Number(date.split("-")[1] - 1)];
  const day = date.split("-")[2];

  let label;
  let styleColors = { title: "", background: "" };

  if (averageTemp < 0) {
    label = "Very Cold";
    styleColors = { title: "#0088f2", background: "#0093ff" };
  } else if (averageTemp >= 0 && averageTemp < 15) {
    label = "Cold";
    styleColors = { title: "#00bbf0", background: "#00caff" };
  } else if (averageTemp >= 15 && averageTemp < 25) {
    label = "Warm";
    styleColors = { title: "#f08000", background: "#ff8a00" };
  } else if (averageTemp >= 25) {
    label = "Hot";
    styleColors = { title: "#e23200", background: "#f53600" };
  }

  const expressions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Slight or moderate thunderstorm",
    96: "Slight hail",
    99: "Heavy hail",
  };

  return (
    <li
      className="weather-result-container"
      style={{
        backgroundColor: styleColors.background,
      }}
    >
      <p
        className="temp-label"
        style={{
          background: styleColors.title,
        }}
      >
        {label}
      </p>

      <div className="basic-info">
        <div className="calender-container">
          <p className="result-month">{month}</p>
          <p className="result-date">{day}</p>
        </div>

        <div>
          <p className="avg-temp">{averageTemp.toFixed(1)}&#8451;</p>
          <p className="min-max-temps">
            Min:{min} <br />
            Max:{max}
          </p>
        </div>
      </div>

      <p className="feels-like">Feels like {avgFeelTemp.toFixed(1)}&#8451;</p>

      <p
        className="weather-code"
        style={{
          background: styleColors.title,
        }}
      >
        {expressions[code]}
      </p>
    </li>
  );
};

export default WeatherResult;
