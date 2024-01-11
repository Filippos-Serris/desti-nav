import { useState } from "react";

import "../../assets/stylesheets/Weather/WeatherForm.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WeatherForm = (props) => {
  const { title, setter, emptyDate } = props;

  const [selectedDate, setSelectedDate] = useState(null);

  const dateFormatter = (date) => {
    //console.log(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const formattedDate = dateFormatter(date);

    setter(props.title, formattedDate);
  };

  return (
    <div className="date">
      <p>{title}</p>
      <DatePicker
        className={emptyDate ? "empty-weather-form" : "weather-form"}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
      ></DatePicker>
    </div>
  );
};

export default WeatherForm;
