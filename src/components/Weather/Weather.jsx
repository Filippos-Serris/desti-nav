import { useEffect, useContext, useState } from "react";

import "./Weather.css";

import LocationContext from "../../store/location-context";
import Card from "../UI/Card";
import WeatherForm from "./WeatherForm";
import WeatherResultsList from "./WeatherResultsList";

const Weather = (props) => {
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

  const setDateRange = (identifier, date) => {
    if (identifier === "From") {
      setDates({ ...dates, startDate: date });
      //console.log(`identifier: ${identifier}, date: ${date}`);
    } else {
      setDates({ ...dates, endDate: date });
      //console.log(`identifier: ${identifier}, date: ${date}`);
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
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${ctxLocation.lat}&longitude=${ctxLocation.lng}1&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,visibility&daily=temperature_2m_max,temperature_2m_min&start_date=${dates.startDate}&end_date=${dates.endDate}`
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
              max: resData.daily.temperature_2m_max[index],
            })
        );

        //console.log(returnedTemperatures);
        setApiResponse(returnedTemperatures);
        setWeatherListActive(true);
      } catch (error) {
        console.log(error);
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
      setWrongDates(true);
    } else {
      setWrongDates(false);
      setFirstCall(false);
      setSearch(!search);
    }
  };

  return (
    <Card>
      <h2 id={props.id}>Weather Section</h2>
      <p>
        Keep in mind that weather results range from 6 months prior to current
        date until 15 days ahead
      </p>

      <form className="date-form" onSubmit={searchHandler}>
        <WeatherForm title="From" setter={setDateRange}></WeatherForm>
        <WeatherForm title="to" setter={setDateRange}></WeatherForm>

        <button>Search</button>
      </form>
      {weatherListActive && (
        <WeatherResultsList weatherConditions={apiResponse} />
      )}
      {wrongDates && (
        <p>
          Start and end dates are mandatory for results and must be in
          chronologically right order so check again.
        </p>
      )}
    </Card>
  );
};

export default Weather;