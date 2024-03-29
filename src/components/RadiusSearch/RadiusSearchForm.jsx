import { useRef, useState, useContext } from "react";

import "../../assets/stylesheets/RadiusSearch/RadiusSearchForm.css";

import LocationContext from "../../store/location-context";

const RadiusSearchForm = (props) => {
  const { onSearch, buttonDisabled } = props;
  const locationCtx = useContext(LocationContext);

  const [validForm, setValidForm] = useState({
    validRadius: true,
    validLimit: true,
  });

  const radius = useRef();
  const limit = useRef();
  const rate = useRef("1");

  const handleRateChange = (event) => {
    rate.current = event.target.value;
  };

  const isEmpty = (value) => {
    return value === "";
  };

  const formValidity = (radius, limit) => {
    if (isEmpty(radius)) {
      setValidForm((prevState) => ({ ...prevState, validRadius: false }));
    } else {
      setValidForm((prevState) => ({ ...prevState, validRadius: true }));
    }
    if (isEmpty(limit)) {
      setValidForm((prevState) => ({ ...prevState, validLimit: false }));
    } else {
      setValidForm((prevState) => ({ ...prevState, validLimit: true }));
    }
  };

  const searchHandler = (event) => {
    event.preventDefault();

    console.log("search pressed");

    const enteredRadius = radius.current.value;
    const enteredLimit = limit.current.value;
    const enteredRate = rate.current;

    formValidity(enteredRadius, enteredLimit);

    if (
      !isEmpty(enteredRadius) &&
      !isEmpty(enteredLimit) &&
      locationCtx.lat !== null &&
      locationCtx.lng !== null
    ) {
      console.log("onSearch run");
      onSearch({
        radius: enteredRadius,
        limit: enteredLimit,
        rate: enteredRate,
      });
    }
  };

  return (
    <form className="form" onSubmit={searchHandler}>
      <div className="inputs">
        <label htmlFor="radius">Radius</label>
        <input
          className={!validForm.validRadius ? "false-input" : null}
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
          className={!validForm.validLimit ? "false-input" : null}
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

      <button disabled={buttonDisabled} />
    </form>
  );
};

export default RadiusSearchForm;
