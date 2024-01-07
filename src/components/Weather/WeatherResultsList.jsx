import { Fragment } from "react";
import WeatherResult from "./WeatherResult";

const WeatherResultsList = (props) => {
  const{weatherConditions}=props
  return (
    <Fragment>
      {weatherConditions.length === 0 && <p>FUCK</p>}
      {weatherConditions.length !== 0 && (
        <ul>
          {weatherConditions.map((data) => (
            <WeatherResult key={data.id} weather={data} />
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default WeatherResultsList;
