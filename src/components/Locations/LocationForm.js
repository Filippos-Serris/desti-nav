import { Fragment, useRef, useState } from "react";
import React from "react";

const isEmpty = (value) => value.trim() === "";

const LocationForm = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    street: true,
    postal: true,
    country: true,
    city: true,
  });
  //const [geoResponse, setGeoResponse] = useState([]);

  const streetRef = useRef();
  const postalRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const numRef = useRef();

  const validInputStyle = "w-20 h-3 border border-black";
  const invalidInputStyle = "w-20 h-3 border border-red-500";

  const searchHandler = (event) => {
    event.preventDefault();

    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCountry = countryRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredNum = numRef.current.value;

    //formValidity()
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

      <form className="flex space-x-4" onSubmit={searchHandler}>
        <div className="flex flex-col">
          <label htmlFor="street" className="mb-1">
            Street
          </label>
          <input
            id="street"
            type="text"
            ref={streetRef}
            placeholder="Spooner Street"
            className={
              formInputValidity.street ? validInputStyle : invalidInputStyle
            }
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="number" className="mb-1">
            Street
          </label>
          <input
            id="number"
            type="number"
            ref={numRef}
            placeholder="31"
            className={
              formInputValidity.num ? validInputStyle : invalidInputStyle
            }
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            ref={cityRef}
            placeholder="Quahog"
            className={
              formInputValidity.city ? validInputStyle : invalidInputStyle
            }
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="postal" className="mb-1">
            Postal
          </label>
          <input
            id="postal"
            type="text"
            ref={postalRef}
            placeholder="00093"
            className={
              formInputValidity.postal ? validInputStyle : invalidInputStyle
            }
          ></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-1">
            Country
          </label>
          <input
            id="country"
            type="text"
            ref={countryRef}
            placeholder="US State"
            className={
              formInputValidity.country ? validInputStyle : invalidInputStyle
            }
          ></input>
        </div>

        <div className="mb-4">
          <small className="block text-sm text-gray-500 mt-2">
            Not all fields are mandatory but more information leads to more
            accurate results
          </small>
        </div>

        <button className="rounded-full bg-blue-500 text-white text-md border border-black p-2">
          Search
        </button>
      </form>
    </Fragment>
  );
};

export default LocationForm;
