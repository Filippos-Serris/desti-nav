import { useRef, useState } from "react";

import "./RadiusSearchForm.css";

const RadiusSearchForm = (props) => {
  const radius = useRef();
  const limit = useRef();
  const rate = useRef("1");

  const handleRateChange = (event) => {
    rate.current = event.target.value;
  };

  const searchHandler = (event) => {
    event.preventDefault();

    let enteredRadius = radius.current.value;
    let enteredLimit = limit.current.value;
    let enteredRate = rate.current;

    console.log(
      `Radius:${enteredRadius}, Limit:${enteredLimit}, Rate:${enteredRate}`
    );

    props.onSearch({
      radius: enteredRadius,
      limit: enteredLimit,
      rate: enteredRate,
    });
  };

  return (
    <form className="form" onSubmit={searchHandler}>
      <div className="inputs">
        <label htmlFor="radius">Radius</label>
        <input
          id="radius"
          type="number"
          placeholder="1-10000"
          ref={radius}
          min={1}
        ></input>
      </div>

      <div className="inputs">
        <label htmlFor="limit">Number of results</label>
        <input
          id="limit"
          type="number"
          placeholder="1-1000"
          ref={limit}
          min={1}
          max={1000}
        ></input>
      </div>

      <div className="inputs">
        <label htmlFor="rate">Rate</label>
        <select id="rate" onChange={handleRateChange}>
          <option value="---">---</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <button />
    </form>
  );
};

export default RadiusSearchForm;
