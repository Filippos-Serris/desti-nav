import { useRef } from "react";

import "./WeatherForm.css";

const WeatherForm = (props) => {
  const startDay = useRef();
  const startMonth = useRef();
  const startYear = useRef();

  return (
    <form>
      <div className="dates">
        <p>{props.title}</p>
        <div>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            placeholder="1940-now"
            ref={startYear}
            type="number"
          ></input>
        </div>
        <div>
          <label htmlFor="month">Month</label>
          <input
            id="month"
            placeholder="1-12"
            ref={startMonth}
            type="number"
          ></input>
        </div>

        <div>
          <label htmlFor="day">Day</label>
          <input
            id="day"
            placeholder="1-31"
            ref={startDay}
            type="number"
          ></input>
        </div>
      </div>
    </form>
  );
};

export default WeatherForm;
