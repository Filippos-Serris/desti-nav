import { useEffect, useContext, useState, useRef } from "react";

import "./Weather.css";

import LocationContext from "../../store/location-context";
import Card from "../UI/Card";
import WeatherForm from "./WeatherForm";

const Weather = (props) => {
  const [firstCall, setFirstCall] = useState(true);
  const ctxLocation = useContext(LocationContext);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });

  const startDay = useRef();
  const startMonth = useRef();
  const startYear = useRef();

  const endDay = useRef();
  const endMonth = useRef();
  const endYear = useRef();

  useEffect(() => {
    if (firstCall) {
      return;
    }

    async function fetchWeather() {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${ctxLocation.lat}&longitude=${ctxLocation.lng}1&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,visibility&daily=temperature_2m_max,temperature_2m_min&start_date=${dates.startDate}&end_date=${dates.endDate}`
      );
      const resData = await res.json();
      //console.log(resData);
    }
    fetchWeather();
  }, [dates]);

  const searchHandler = (event) => {
    event.preventDefault();

    let startDate = `${startYear.current.value}-${startMonth.current.value}-${startDay.current.value}`;
    let endDate = `${endYear.current.value}-${endMonth.current.value}-${endDay.current.value}`;

    console.log(`Start date:${startDate}, End date:${endDate}`);

    setFirstCall(false);
    setDates({ startDate: startDate, endDate: endDate });
  };

  return (
    <Card>
      <h2 id={props.id}>Weather Section</h2>

      <form onSubmit={searchHandler}>
        <WeatherForm title="Start date"></WeatherForm>
        <WeatherForm title="End date"></WeatherForm>

        <button>Search</button>
      </form>
      <p>Range for the dates 6 months prior to </p>
    </Card>
  );
};

export default Weather;
