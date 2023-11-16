import { Fragment, useRef, useState, useEffect } from "react";

const GEOCODING_API_KEY = "845ebdcc2d794f9785f968141732d5d9";

const isEmpty = (value) => value.trim() === "";
const Location = () => {
  const [formInputValidity, setFormInputValidity] = useState({
    street: true,
    postal: true,
    country: true,
    city: true,
  });

  const [address, setAddress] = useState("");

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

    setAddress(
      `${enteredStreet}, ${enteredCountry}, ${enteredCity}, ${enteredPostal}, ${enteredNum}`
    );
  };

  useEffect(() => {
    async function fetchLocation() {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${GEOCODING_API_KEY}`
      );
      const resData = await res.json();
      console.log(resData);
    }
    fetchLocation();
  }, [address]);

  return (
    <Fragment>
      <h2>Set location to begin</h2>

      <form className="flex space-x-4" onSubmit={searchHandler}>
        <div className="flex flex-col">
          <label htmlFor="street" className="mb-1">
            Street
          </label>
          <input
            id="street"
            type="text"
            ref={streetRef}
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

export default Location;
