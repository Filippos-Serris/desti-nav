import { Fragment } from "react";
import Card from "../UI/Card";

const WeatherResult = (props) => {
  const {weather} = props
  return (
    <Card>
      <li>
        <p>Date {weather.date}</p>
        <p>Max {weather.max}</p>
        <p>Min {weather.min}</p>
      </li>
    </Card>
  );
};

export default WeatherResult;
