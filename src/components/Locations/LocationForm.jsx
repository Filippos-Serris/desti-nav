import { Fragment, useRef, useState } from "react";

import "../../assets/stylesheets/Locations/LocationForm.css";

const isEmpty = (value) => value.trim() === "";

const LocationForm = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    street: true,
    country: true,
  });

  const streetRef = useRef();
  const postalRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const numRef = useRef();

  const searchHandler = (event) => {
    event.preventDefault();

    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCountry = countryRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredNum = numRef.current.value;

    setFormInputValidity({
      street: !isEmpty(enteredStreet),
      country: !isEmpty(enteredCountry),
    });

    if (!isEmpty(enteredStreet) && !isEmpty(enteredCountry)) {
      props.onAddress(
        `${enteredStreet} ${enteredNum}, ${enteredCountry}, ${enteredCity}, ${enteredPostal}`
      );
    }
  };

  return (
    <Fragment>
      <form className="location-form" onSubmit={searchHandler}>
        <div className="location-inputs">
          <label htmlFor="street">*Street</label>
          <input
            id="street"
            type="text"
            ref={streetRef}
            placeholder="Spooner Street"
            className={formInputValidity.street ? null : "false-input"}
          ></input>
        </div>

        <div className="location-inputs">
          <label htmlFor="number">St. number</label>
          <input
            id="number"
            type="number"
            ref={numRef}
            placeholder="31"
          ></input>
        </div>

        <div className="location-inputs">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            ref={cityRef}
            placeholder="Quahog"
          ></input>
        </div>

        <div className="location-inputs">
          <label htmlFor="postal">Postal</label>
          <input
            id="postal"
            type="number"
            ref={postalRef}
            placeholder="00093"
          ></input>
        </div>

        <div className="location-inputs">
          <label htmlFor="country">*Country</label>
          <input
            id="country"
            type="text"
            ref={countryRef}
            placeholder="US State"
            className={formInputValidity.country ? null : "false-input"}
          ></input>
        </div>
        <button></button>
      </form>
    </Fragment>
  );
};

export default LocationForm;
