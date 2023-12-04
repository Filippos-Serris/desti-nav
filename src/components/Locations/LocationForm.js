import { Fragment, useRef, useState } from "react";
import "./LocationForm.css";

const isEmpty = (value) => value.trim() === "";

const LocationForm = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    street: true,
    num: true,
    postal: true,
    country: true,
    city: true,
  });

  const [mandatoryField, setMandatoryFields] = useState(true);

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
      postal: !isEmpty(enteredPostal),
      country: !isEmpty(enteredCountry),
      city: !isEmpty(enteredCity),
      num: !isEmpty(enteredNum),
    });

    props.onAddress(
      `${enteredStreet} ${enteredNum}, ${enteredCountry}, ${enteredCity}, ${enteredPostal}`
    );
  };

  return (
    <Fragment>
      <h2>Insert location</h2>
      <form className="form" onSubmit={searchHandler}>
        <div className="inputs">
          <label htmlFor="street">*Street</label>
          <input
            id="street"
            type="text"
            ref={streetRef}
            placeholder="Spooner Street"
          ></input>
        </div>

        <div className="inputs">
          <label htmlFor="number">St. number</label>
          <input
            id="number"
            type="number"
            ref={numRef}
            placeholder="31"
          ></input>
        </div>

        <div className="inputs">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            ref={cityRef}
            placeholder="Quahog"
          ></input>
        </div>

        <div className="inputs">
          <label htmlFor="postal">Postal</label>
          <input
            id="postal"
            type="number"
            ref={postalRef}
            placeholder="00093"
          ></input>
        </div>

        <div className="inputs">
          <label htmlFor="country">*Country</label>
          <input
            id="country"
            type="text"
            ref={countryRef}
            placeholder="US State"
          ></input>
        </div>

        {!mandatoryField && (
          <p>Street and Country fields are mandatory for location search</p>
        )}

        <div className="mb-4"></div>

        <button className="rounded-full bg-blue-500 text-white text-md border border-black p-2">
          Search
        </button>
      </form>
      <small className="block text-sm text-gray-500 mt-2">
        Not all fields are mandatory, just those annotated with the * symbol but
        more information leads to more accurate results
      </small>
    </Fragment>
  );
};

export default LocationForm;
