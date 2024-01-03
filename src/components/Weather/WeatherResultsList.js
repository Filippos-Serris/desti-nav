import { Fragment } from "react";
import WeatherResult from "./WeatherResult";

const WeatherResultsList = (props) => {
  return (
    <Fragment>
      {props.weatherConditions.length === 0 && <p>FUCK</p>}
      {props.weatherConditions.length !== 0 && (
        <ul>
          {props.weatherConditions.map((data) => (
            <WeatherResult key={data.id} weather={data} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default WeatherResultsList;
