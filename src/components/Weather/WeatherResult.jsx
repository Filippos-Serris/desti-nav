import { Fragment } from "react";
import Card from "../UI/Card";

const WeatherResult = (props) => {
  return (
    <Card>
      <li>
        <p>Date {props.weather.date}</p>
        <p>Max {props.weather.max}</p>
        <p>Min {props.weather.min}</p>
      </li>
    </Card>
  );
};

export default WeatherResult;
