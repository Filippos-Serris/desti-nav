import { useEffect, useContext, useState } from "react";

import "../../assets/stylesheets/Weather/Weather.css";

import LocationContext from "../../store/location-context";
import WeatherForm from "./WeatherForm";
import WeatherResultsList from "./WeatherResultsList";
import Hint from "../UI/Hint";

const Weather = (props) => {
  const { id, buttonDisabled } = props;
  const [emptyDate, setEmptyDate] = useState({ from: false, to: false });
  const [apiResponse, setApiResponse] = useState([]);
  const [wrongDates, setWrongDates] = useState(false);
  const [weatherListActive, setWeatherListActive] = useState(false);
  const [firstCall, setFirstCall] = useState(true);
  const ctxLocation = useContext(LocationContext);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [search, setSearch] = useState(false);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const setDateRange = (identifier, date) => {
    if (identifier === "From") {
      setDates({ ...dates, startDate: date });
    } else {
      setDates({ ...dates, endDate: date });
    }
  };

  const compareDates = (startingDate, endingDate) => {
    const start = new Date(startingDate);
    const end = new Date(endingDate);

    if (start.getTime() < end.getTime() || start.getTime() === end.getTime()) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (firstCall) {
      return;
    }

    async function fetchWeather() {
      try {
        setError(false);
        setSearching(true);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${ctxLocation.lat}&longitude=${ctxLocation.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,showers_sum,snowfall_sum&timezone=auto&start_date=${dates.startDate}&end_date=${dates.endDate}`
        );
        const resData = await res.json();
        console.log(resData);

        let returnedTemperatures = [];

        resData.daily.time.map((data) =>
          returnedTemperatures.push({
            id: data,
            date: data,
          })
        );

        returnedTemperatures.map(
          (data, index) =>
            (returnedTemperatures[index] = {
              ...returnedTemperatures[index],
              min: resData.daily.temperature_2m_min[index],
              apparentMin: resData.daily.apparent_temperature_min[index],

              max: resData.daily.temperature_2m_max[index],
              apparentMax: resData.daily.apparent_temperature_max[index],

              code: resData.daily.weather_code[index],
            })
        );

        setApiResponse(returnedTemperatures);
        setSearching(false);
        setWeatherListActive(true);
      } catch (error) {
        setSearching(false);
        setErrorMessage(error.message);
        setError(true);
      }
    }

    fetchWeather();
  }, [search]);

  const searchHandler = (event) => {
    event.preventDefault();
    if (
      dates.startDate === "" ||
      dates.endDate === "" ||
      !compareDates(dates.startDate, dates.endDate)
    ) {
      if (dates.startDate === "") {
        setEmptyDate({ ...emptyDate, to: true });
      }
      if (dates.endDate === "") {
        setEmptyDate({ ...emptyDate, from: true });
      }
      setWrongDates(true);
    } else {
      setEmptyDate({ from: false, to: false });
      setWrongDates(false);
      setFirstCall(false);
      setSearch(!search);
    }
  };

  return (
    <div className="weather-form-container">
      <h2 className="title" id={id}>
        Weather Section
      </h2>
      <p className="instructions">
        Keep in mind that weather results range from 6 months prior to current
        date until 15 days ahead
      </p>

      <form className="date-form" onSubmit={searchHandler}>
        <WeatherForm
          title="From"
          setter={setDateRange}
          emptyDate={emptyDate.from}
        ></WeatherForm>
        <WeatherForm
          title="to"
          setter={setDateRange}
          emptyDate={emptyDate.to}
        ></WeatherForm>

        <button disabled={buttonDisabled} />
      </form>
      {searching && <Hint />}
      {error && <Hint message={errorMessage} />}
      {weatherListActive && !searching && (
        <WeatherResultsList weatherConditions={apiResponse} />
      )}
      {wrongDates && (
        <p className="error-message">
          Start and end dates are mandatory for results and must be in
          chronologically right order so check again.
        </p>
      )}
    </div>
  );
};

export default Weather;
