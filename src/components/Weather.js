import { useEffect, useContext, useState, useRef } from "react";

import LocationContext from "../store/location-context";
import Card from "./UI/Card";

const Weather = () => {
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
        `https://api.open-meteo.com/v1/forecast?latitude=${ctxLocation.lat}&longitude=${ctxLocation.lng}1&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,visibility&daily=temperature_2m_max,temperature_2m_min&start_date=${dates.startDate}&end_date=2023-12-03`
      );
      const resData = await res.json();
      console.log(resData);
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

    console.log(
      `State start date"${dates.startDate}, State end date:${dates.endDate}`
    );
  };

  return (
    <Card>
      <h2>Weather Section</h2>
      <form onSubmit={searchHandler}>
        <div>
          <label>Start Date</label>
          <input placeholder="1-31" ref={startDay} type="number"></input>
          <input placeholder="1-12" ref={startMonth} type="number"></input>
          <input placeholder="1940-now" ref={startYear} type="number"></input>
        </div>

        <div>
          <label>End Date</label>
          <input placeholder="1-31" ref={endDay} type="number"></input>
          <input placeholder="1-12" ref={endMonth} type="number"></input>
          <input placeholder="1940-now" ref={endYear} type="number"></input>
        </div>

        <button>Search</button>
      </form>
      <p>from 08-06-2022 until 19-12-2023</p>
    </Card>
  );
};

export default Weather;
